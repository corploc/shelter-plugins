import * as openpgp from 'openpgp';
import { UserKeyPair, PluginSettings } from './types';
import { getPublicKeys } from './api';
import { Store } from './store';

let cachedPrivateKey: openpgp.PrivateKey | null = null;
let cacheTimestamp: number | null = null;

export class PassphraseRequiredError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PassphraseRequiredError";
    }
}

/**
 * Generates a new PGP key pair.
 */
export async function generateKeyPair(passphrase: string): Promise<UserKeyPair> {
    const { privateKey, publicKey } = await openpgp.generateKey({
        type: 'rsa',
        rsaBits: 4096,
        userIDs: [{ name: 'PGPCord User', email: 'user@pgpcord.dev' }],
        passphrase,
        format: 'armored'
    });

    const keyId = (await openpgp.readKey({ armoredKey: publicKey })).getKeyID().toHex();

    return { publicKey, privateKey, keyId };
}

/**
 * Decrypts a PGP private key using a passphrase and caches it.
 */
export async function decryptAndCachePrivateKey(passphrase: string): Promise<openpgp.PrivateKey> {
    const keyPair = loadKeyPairFromLocalStorage();
    if (!keyPair) {
        throw new Error("No key pair found in local storage.");
    }

    console.log("PGPCord: Loading private key from storage. Length:", keyPair.privateKey.length);

    // Clean up key if needed (similar to message cleaning)
    let cleanedKey = keyPair.privateKey.trim();
    if (cleanedKey.includes('\\n')) {
        console.log("PGPCord: Detected literal \\n in private key, fixing...");
        cleanedKey = cleanedKey.replace(/\\n/g, '\n');
    }

    const privateKey = await openpgp.readPrivateKey({ armoredKey: cleanedKey });

    // Check if the key is already decrypted
    if (privateKey.isDecrypted()) {
        console.log("PGPCord: Private key is already decrypted, caching directly.");
        cachedPrivateKey = privateKey;
        cacheTimestamp = Date.now();
        return privateKey;
    }

    const decryptedKey = await openpgp.decryptKey({
        privateKey,
        passphrase
    });

    cachedPrivateKey = decryptedKey;
    cacheTimestamp = Date.now();

    return decryptedKey;
}

/**
 * Retrieves the cached private key if it's still valid according to the user's settings.
 */
export function getCachedPrivateKey(): openpgp.PrivateKey | null {
    const settings: PluginSettings = Store.settings || { cacheDuration: 'session', cacheTimeMinutes: 15 };

    if (!cachedPrivateKey || !cacheTimestamp) return null;
    if (settings.cacheDuration === 'none') return null;

    if (settings.cacheDuration === 'time') {
        const elapsedMinutes = (Date.now() - cacheTimestamp) / (1000 * 60);
        if (settings.cacheTimeMinutes && elapsedMinutes > settings.cacheTimeMinutes) {
            cachedPrivateKey = null;
            cacheTimestamp = null;
            return null;
        }
    }

    return cachedPrivateKey;
}

/**
 * Clears the cached private key from memory.
 */
export function clearCachedPrivateKey(): void {
    cachedPrivateKey = null;
    cacheTimestamp = null;
}

/**
 * Saves the user's key pair to local storage.
 */
export function saveKeyPairToLocalStorage(keyPair: UserKeyPair): void {
    Store.keys = keyPair;
}

/**
 * Loads the user's key pair from local storage.
 */
export function loadKeyPairFromLocalStorage(): UserKeyPair | undefined {
    return Store.keys;
}

/**
 * Encrypts a message for a list of recipients.
 */
export async function encryptMessage(message: string, recipientIds: string[]): Promise<string> {
    const recipientKeysData = await getPublicKeys(recipientIds);
    if (recipientKeysData.length === 0) {
        throw new Error("No valid recipient public keys found.");
    }

    const recipientPublicKeys = await Promise.all(
        recipientKeysData.map(async r => {
            try {
                let cleanedKey = r.public_key.trim();
                if (cleanedKey.includes('\\n')) {
                    cleanedKey = cleanedKey.replace(/\\n/g, '\n');
                }
                if (!cleanedKey.includes('\n') && cleanedKey.includes('-----BEGIN PGP PUBLIC KEY BLOCK-----')) {
                    cleanedKey = cleanedKey.replace('-----BEGIN PGP PUBLIC KEY BLOCK-----', '-----BEGIN PGP PUBLIC KEY BLOCK-----\n');
                    cleanedKey = cleanedKey.replace('-----END PGP PUBLIC KEY BLOCK-----', '\n-----END PGP PUBLIC KEY BLOCK-----');
                }
                return await openpgp.readKey({ armoredKey: cleanedKey });
            } catch (e) {
                console.error(`PGPCord: Failed to parse key for user ${r.discord_id}`, e);
                return null;
            }
        })
    );

    const validKeys = recipientPublicKeys.filter(k => k !== null) as openpgp.PublicKey[];

    if (validKeys.length === 0) {
        throw new Error("No valid recipient public keys could be parsed.");
    }

    const ownKeyPair = loadKeyPairFromLocalStorage();
    if (!ownKeyPair) {
        throw new Error("Cannot encrypt message: Own key pair not found.");
    }
    const ownPublicKey = await openpgp.readKey({ armoredKey: ownKeyPair.publicKey });

    const encryptedMessage = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: message }),
        encryptionKeys: [...validKeys, ownPublicKey], // Also encrypt for self
    });

    return encryptedMessage as string;
}

export class WrongKeyError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "WrongKeyError";
    }
}

/**
 * Decrypts a PGP message.
 */
export async function decryptMessage(encryptedMessage: string): Promise<string> {
    let cleanedMessage = encryptedMessage.trim();
    if (cleanedMessage.includes('\\n')) {
        cleanedMessage = cleanedMessage.replace(/\\n/g, '\n');
    }
    if (!cleanedMessage.includes('\n') && cleanedMessage.includes('-----BEGIN PGP MESSAGE-----')) {
        cleanedMessage = cleanedMessage.replace('-----BEGIN PGP MESSAGE-----', '-----BEGIN PGP MESSAGE-----\n');
        cleanedMessage = cleanedMessage.replace('-----END PGP MESSAGE-----', '\n-----END PGP MESSAGE-----');
    }

    const message = await openpgp.readMessage({ armoredMessage: cleanedMessage });

    const keyPair = loadKeyPairFromLocalStorage();
    if (!keyPair) throw new Error("No key pair found.");

    const encryptionKeyIds = message.getEncryptionKeyIDs();
    const privateKeyFromStorage = await openpgp.readPrivateKey({ armoredKey: keyPair.privateKey });
    const allKeyIds = privateKeyFromStorage.getKeyIDs().map((k: any) => k.toHex().toLowerCase());

    const isForMe = encryptionKeyIds.some((msgKeyId: any) =>
        allKeyIds.includes(msgKeyId.toHex().toLowerCase())
    );

    if (!isForMe) {
        throw new WrongKeyError("Message not encrypted for this key.");
    }

    let privateKey = getCachedPrivateKey();

    if (!privateKey) {
        throw new PassphraseRequiredError("Passphrase required to decrypt private key.");
    }

    const { data: decrypted } = await openpgp.decrypt({
        message,
        decryptionKeys: privateKey,
    });

    return decrypted as string;
}

export async function encryptPrivateKey(privateKeyArmored: string, passphrase: string): Promise<string> {
    const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored });
    if (!privateKey.isDecrypted()) {
        return privateKeyArmored; // Already encrypted
    }
    const encryptedKey = await openpgp.encryptKey({
        privateKey,
        passphrase
    });
    return encryptedKey.armor();
}

export async function decryptPrivateKey(privateKeyArmored: string, passphrase: string): Promise<string> {
    const privateKey = await openpgp.readPrivateKey({ armoredKey: privateKeyArmored });
    if (privateKey.isDecrypted()) {
        return privateKeyArmored; // Already decrypted
    }
    const decryptedKey = await openpgp.decryptKey({
        privateKey,
        passphrase
    });
    return decryptedKey.armor();
}
