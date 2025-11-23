export interface UserKeyPair {
  publicKey: string;
  privateKey: string; // Encrypted
  keyId: string;
}

export interface PublicKeyRecord {
  discord_id: string;
  public_key: string;
  updated_at: string;
}

export type CacheDuration = 'session' | 'time' | 'none';

export interface PluginSettings {
  cacheDuration: CacheDuration;
  cacheTimeMinutes: number;
  lastKnownKeyStatus?: 'idle' | 'checking' | 'found' | 'not_found' | 'mismatch';
}
