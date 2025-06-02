CREATE INDEX idx_user_settings_user_id ON user_settings(user_id);
CREATE INDEX idx_user_settings_key ON user_settings(setting_key);
CREATE INDEX idx_user_settings_user_key ON user_settings(user_id, setting_key);
