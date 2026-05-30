-- Tie saved sessions and brains to Supabase auth users for dashboard history.
ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE brains
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_sessions_user_created ON sessions(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_brains_user_generated ON brains(user_id, generated_at DESC);

-- Replace broad demo policies with owner-scoped reads.
DROP POLICY IF EXISTS "service_role_all_sessions" ON sessions;
DROP POLICY IF EXISTS "public_read_brains" ON brains;
DROP POLICY IF EXISTS "service_role_write_brains" ON brains;
DROP POLICY IF EXISTS "service_role_update_brains" ON brains;

CREATE POLICY "authenticated_read_own_sessions"
  ON sessions FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "authenticated_read_own_brains"
  ON brains FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
