import { createClient } from '@supabase/supabase-js';
import { PublicKeyRecord } from './types';

// TODO: Replace with actual Supabase URL and Anon Key
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Assume Shelter provides access to Discord's internals, like the current user and OIDC token.
declare const shelter: any; 

if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn('PGPCord: Supabase URL and Anon Key are not configured. Please configure them in plugins/pgpcord/lib/api.ts');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Retrieves a Discord OIDC token.
 * This is a placeholder function. The actual implementation will depend on how
 * Vencord/Shelter exposes this functionality.
 * @returns A promise that resolves to the OIDC token.
 */
async function getDiscordOidcToken(): Promise<string> {
  console.log("Attempting to get OIDC token...");
  // This is a placeholder. The actual API might be different.
  const token = await shelter.http.get("/api/v9/users/@me/oidc-token");
  if (!token.ok) throw new Error("Failed to get OIDC token.");
  return token.body.token;
}

/**
 * Publishes a user's public key to the Supabase backend.
 */
export async function publishPublicKey(publicKey: string): Promise<void> {
  const token = await getDiscordOidcToken();
  
  const { error: authError } = await supabase.auth.setSession({ access_token: token, provider: 'discord' });
  if (authError) {
    console.error("Supabase auth error:", authError);
    throw new Error("Failed to authenticate with Supabase.");
  }

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("Supabase user error:", userError);
    throw new Error("Failed to get user from Supabase.");
  }

  const record: Partial<PublicKeyRecord> = {
    discord_id: user.id,
    public_key: publicKey,
    updated_at: new Date().toISOString(),
  };

  const { error: upsertError } = await supabase.from('user_keys').upsert(record);
  if (upsertError) {
    console.error("Supabase upsert error:", upsertError);
    throw new Error("Failed to publish public key.");
  }

  console.log("Public key published successfully for user:", user.id);
}

/**
 * Fetches public keys for a list of user IDs from the Supabase backend.
 * @param userIds An array of Discord user IDs.
 * @returns A promise that resolves to an array of PublicKeyRecord objects.
 */
export async function getPublicKeys(userIds: string[]): Promise<PublicKeyRecord[]> {
  const { data, error } = await supabase
    .from('user_keys')
    .select('*')
    .in('discord_id', userIds);

  if (error) {
    console.error("Supabase select error:", error);
    throw new Error("Failed to fetch public keys.");
  }

  return data || [];
}
