ALTER TABLE user_setting_groups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view setting groups" ON user_setting_groups;
CREATE POLICY "Anyone can view setting groups" 
  ON user_setting_groups FOR SELECT 
  USING (true);

