import * as openpgp from 'openpgp';
import { UserKeyPair, PluginSettings } from './types';
import { getPublicKeys } from './api';

// Assuming Shelter's data API is available globally via `shelter`
declare const shelter: any;

let cachedPrivateKey: openpgp.PrivateKey | null = null;
let cacheTimestamp: number | null = null;

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
export async function decryptAndCachePrivateKey(encryptedPrivateKey: string, passphrase: string): Promise<openpgp.PrivateKey> {
  const privateKey = await openpgp.readPrivateKey({ armoredKey: encryptedPrivateKey });
  await privateKey.decrypt(passphrase);
  
  cachedPrivateKey = privateKey;
  cacheTimestamp = Date.now();
  
  return privateKey;
}

/**
 * Retrieves the cached private key if it's still valid according to the user's settings.
 */
export function getCachedPrivateKey(): openpgp.PrivateKey | null {
  const settings: PluginSettings = shelter.plugin.store.pgpcord_settings || { cacheDuration: 'session', cacheTimeMinutes: 15 };

  if (!cachedPrivateKey || !cacheTimestamp) return null;
  if (settings.cacheDuration === 'none') return null;

  if (settings.cacheDuration === 'time') {
    const elapsedMinutes = (Date.now() - cacheTimestamp) / (1000 * 60);
    if (elapsedMinutes > settings.cacheTimeMinutes) {
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
 * Saves the user's key pair to Shelter's local storage.
 */
export function saveKeyPairToLocalStorage(keyPair: UserKeyPair): void {
  shelter.plugin.store.pgpcord_keys = keyPair;
}

/**
 * Loads the user's key pair from Shelter's local storage.
 */
export function loadKeyPairFromLocalStorage(): UserKeyPair | undefined {
  return shelter.plugin.store.pgpcord_keys;
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
    recipientKeysData.map(r => openpgp.readKey({ armoredKey: r.public_key }))
  );

  const ownKeyPair = loadKeyPairFromLocalStorage();
  if (!ownKeyPair) {
    throw new Error("Cannot encrypt message: Own key pair not found.");
  }
  const ownPublicKey = await openpgp.readKey({ armoredKey: ownKeyPair.publicKey });
  
  const encryptedMessage = await openpgp.encrypt({
    message: await openpgp.createMessage({ text: message }),
    encryptionKeys: [...recipientPublicKeys, ownPublicKey], // Also encrypt for self
  });

  return encryptedMessage as string;
}

/**
 * Decrypts a PGP message.
 */
export async function decryptMessage(encryptedMessage: string): Promise<string> {
  let privateKey = getCachedPrivateKey();

  if (!privateKey) {
    // In a real implementation, this would trigger a UI prompt for the passphrase.
    // For now, we rely on the key being pre-cached.
    const keyPair = loadKeyPairFromLocalStorage();
    if (!keyPair) throw new Error("No key pair found.");

    // This is a placeholder for getting the passphrase from the user.
    const passphrase = prompt("Your private key is locked. Please enter your passphrase:");
    if (!passphrase) throw new Error("Passphrase not provided.");

    privateKey = await decryptAndCachePrivateKey(keyPair.privateKey, passphrase);
  }

  const message = await openpgp.readMessage({ armoredMessage: encryptedMessage });
  
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
