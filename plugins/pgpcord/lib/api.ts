import { PublicKeyRecord } from './types';

// TODO: Replace with actual Supabase URL and Anon Key
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Assume Shelter provides access to Discord's internals, like the current user and OIDC token.
declare const shelter: any; 

/**
 * Fetches public keys for a list of user IDs from the Supabase backend.
 * @param userIds An array of Discord user IDs.
 * @returns A promise that resolves to an array of PublicKeyRecord objects.
 */
export async function getPublicKeys(userIds: string[]): Promise<PublicKeyRecord[]> {
  if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
    console.warn('PGPCord: Supabase URL and Anon Key are not configured. Cannot fetch public keys.');
    return [];
  }

  const query = new URLSearchParams();
  // Supabase PostgREST syntax for IN filter: column=in.(val1,val2)
  query.append('discord_id', `in.(${userIds.join(',')})`);
  query.append('select', '*');

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

  const data = await response.json();
  return data || [];
}
