# Supabase Backend Contract

This document outlines the database schema and security rules for the Supabase backend that supports the PGPCord plugin.

## Table: `user_keys`

This table stores the public keys of users, associated with their Discord ID.

### Schema

```sql
CREATE TABLE public.user_keys (
  -- The user's unique Discord ID.
  discord_id BIGINT PRIMARY KEY NOT NULL,

  -- The user's public PGP key in ASCII-armored format.
  public_key TEXT NOT NULL,

  -- The timestamp of the last modification.
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add a comment to the table for clarity in database inspection tools.
COMMENT ON TABLE public.user_keys IS 'Stores public PGP keys for Discord users, identified by their Discord ID.';
```

## Row Level Security (RLS)

RLS is enabled on the `user_keys` table to enforce the access policy defined in the constitution.

### Policies

1.  **Public Read Access**: Anyone can read any public key from the table. This is necessary for users to fetch the keys of their conversation partners.

    ```sql
    CREATE POLICY "Allow public read access"
    ON public.user_keys
    FOR SELECT
    USING (true);
    ```

2.  **Owner Write Access**: A user can only insert or update their own public key. This is enforced by matching the `discord_id` in the row with the user's ID from their Discord OIDC authentication token.

    ```sql
    -- Helper function to extract the user's Discord ID from the JWT.
    -- Note: The exact claim might be 'sub' or another field depending on Discord's OIDC implementation.
    -- This assumes the 'sub' claim holds the Discord user ID. This function must be created in the `public` schema.
    CREATE OR REPLACE FUNCTION public.get_discord_user_id()
    RETURNS TEXT AS $$
    BEGIN
      RETURN auth.jwt()->>'sub';
    END;
    $$ LANGUAGE plpgsql STABLE;
    
    -- Policy for INSERT
    CREATE POLICY "Allow individual user to insert their own key"
    ON public.user_keys
    FOR INSERT
    WITH CHECK (public.get_discord_user_id() = discord_id::text);
    
    -- Policy for UPDATE
    CREATE POLICY "Allow individual user to update their own key"
    ON public.user_keys
    FOR UPDATE
    USING (public.get_discord_user_id() = discord_id::text)
    WITH CHECK (public.get_discord_user_id() = discord_id::text);
    
       ```

### Summary of Permissions

| Action | Authenticated User (Owner) | Authenticated User (Not Owner) | Anonymous |
| :--- | :--- | :--- | :--- |
| `SELECT` | ✅ Yes | ✅ Yes | ✅ Yes |
| `INSERT` | ✅ Yes | ❌ No | ❌ No |
| `UPDATE` | ✅ Yes | ❌ No | ❌ No |
| `DELETE` | ❌ No | ❌ No | ❌ No |

*(Note: `DELETE` is intentionally disallowed to prevent accidental or malicious removal of keys. Key updates are handled via `UPDATE`.)*
