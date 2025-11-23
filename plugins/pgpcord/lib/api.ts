import { PublicKeyRecord } from './types';

// Supabase URL and Anon Key
const SUPABASE_URL = 'https://pkbbwljgdyblxtroicpd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_aiZeSeoUYh5roraVYEA8Bw_8cvn7ewe';

// Assume Shelter provides access to Discord's internals, like the current user and OIDC token.
declare const shelter: any; 

const publicKeyCache = new Map<string, { key: PublicKeyRecord | null, timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

/**
 * Fetches public keys for a list of user IDs from the Supabase backend.
 * @param userIds An array of Discord user IDs.
 * @returns A promise that resolves to an array of PublicKeyRecord objects.
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
      // If cached (even if null), don't add to missingIds
    } else {
      missingIds.push(id);
    }
  }

  if (missingIds.length === 0) {
      return cachedKeys;
  }

  const query = new URLSearchParams();
  // Supabase PostgREST syntax
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
        const error = await response.json();
        console.error("Supabase select error:", error);
        throw new Error("Failed to fetch public keys.");
    }

    const data: PublicKeyRecord[] = await response.json();
    
    // Update cache with found keys
    for (const record of data) {
        publicKeyCache.set(record.discord_id, { key: record, timestamp: now });
    }

    // Mark missing keys as null in cache to avoid repeated 404 fetches (negative caching)
    const foundIds = new Set(data.map(r => r.discord_id));
    for (const id of missingIds) {
        if (!foundIds.has(id)) {
            publicKeyCache.set(id, { key: null, timestamp: now });
        }
    }

    return [...cachedKeys, ...(data || [])];
  } catch (e) {
      console.error("PGPCord: Error fetching keys", e);
      return cachedKeys; // Return what we have
  }
}

let currentUserKeyCache: { hasKey: boolean, timestamp: number } | null = null;

/**
 * Checks if the current user has a public key registered.
 * @returns A promise that resolves to true if a key is found, false otherwise.
 */
export async function checkCurrentUserKey(): Promise<boolean> {
  const now = Date.now();
  if (currentUserKeyCache && (now - currentUserKeyCache.timestamp < CACHE_TTL)) {
      return currentUserKeyCache.hasKey;
  }

  const userId = shelter.flux.stores.UserStore.getCurrentUser()?.id;
  if (!userId) {
    console.error('PGPCord: Could not get current user ID.');
    return false;
  }

  const query = new URLSearchParams({
    select: 'discord_id',
    discord_id: `eq.${userId}`,
  });

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/user_keys?${query.toString()}`, {
        method: 'GET',
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Accept': 'application/vnd.pgrst.object+json', // Prefer single object
        }
    });

    if (!response.ok) {
        console.error("Supabase check error:", await response.text());
        return false;
    }

    // PostgREST returns an empty body for GET with no results, but response.ok is true.
    // So we need to check if we can parse it as JSON.
    const data = await response.json();
    const hasKey = !!data;
    currentUserKeyCache = { hasKey, timestamp: now };
    return hasKey;
  } catch (e) {
    // If JSON parsing fails, it likely means empty body (no key)
    currentUserKeyCache = { hasKey: false, timestamp: now };
    return false; 
  }
}
