ALTER TABLE user_setting_definitions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view setting definitions" 
  ON user_setting_definitions FOR SELECT 
  USING (true);

