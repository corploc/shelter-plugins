import { PublicKeyRecord } from './types';
import { findByProps } from "@vencord/webpack";

// Supabase URL and Anon Key
const SUPABASE_URL = 'https://pkbbwljgdyblxtroicpd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_aiZeSeoUYh5roraVYEA8Bw_8cvn7ewe';

const UserStore = findByProps("getCurrentUser", "getUser");

const publicKeyCache = new Map<string, { key: PublicKeyRecord | null, timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

/**
 * Fetches public keys for a list of user IDs from the Supabase backend.
 */
export async function getPublicKeys(userIds: string[]): Promise<PublicKeyRecord[]> {
    const now = Date.now();
    const missingIds: string[] = [];
    const cachedKeys: PublicKeyRecord[] = [];

    for (const id of userIds) {
        const cached = publicKeyCache.get(id);
        if (cached && now - cached.timestamp < CACHE_TTL) {
            if (cached.key) {
                cachedKeys.push(cached.key);
            }
        } else {
            missingIds.push(id);
        }
    }

    if (missingIds.length === 0) {
        return cachedKeys;
    }

    const query = new URLSearchParams();
    if (missingIds.length === 1) {
        query.append('discord_id', `eq.${missingIds[0]}`);
    } else {
        query.append('discord_id', `in.(${missingIds.join(',')})`);
    }
    query.append('select', '*');

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/user_keys?${query.toString()}`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch public keys.");
        }

        const data: PublicKeyRecord[] = await response.json();

        for (const record of data) {
            publicKeyCache.set(record.discord_id, { key: record, timestamp: now });
        }

        const foundIds = new Set(data.map(r => r.discord_id));
        for (const id of missingIds) {
            if (!foundIds.has(id)) {
                publicKeyCache.set(id, { key: null, timestamp: now });
            }
        }

        return [...cachedKeys, ...(data || [])];
    } catch (e) {
        console.error("PGPCord: Error fetching keys", e);
        return cachedKeys;
    }
}

let currentUserKeyCache: { key: PublicKeyRecord | null, timestamp: number } | null = null;

/**
 * Checks if the current user has a public key registered.
 */
export async function checkCurrentUserKey(): Promise<PublicKeyRecord | null> {
    const now = Date.now();
    if (currentUserKeyCache && (now - currentUserKeyCache.timestamp < CACHE_TTL)) {
        return currentUserKeyCache.key;
    }

    const userId = UserStore?.getCurrentUser()?.id;
    if (!userId) {
        console.error('PGPCord: Could not get current user ID.');
        return null;
    }

    const query = new URLSearchParams({
        select: '*',
        discord_id: `eq.${userId}`,
    });

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/user_keys?${query.toString()}`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Accept': 'application/vnd.pgrst.object+json',
            }
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        const keyRecord = data as PublicKeyRecord;
        currentUserKeyCache = { key: keyRecord, timestamp: now };
        return keyRecord;
    } catch (e) {
        currentUserKeyCache = { key: null, timestamp: now };
        return null;
    }
}
