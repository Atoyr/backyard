-- 初期スキーマ: プロフィールテーブルとTODOテーブルの作成

-- プロフィールテーブルの作成
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 優先度のENUM型を定義
CREATE TYPE priority_level AS ENUM ('high', 'medium', 'low');

-- タスクステータスのENUM型を定義
CREATE TYPE task_status AS ENUM ('todo', 'doing', 'done', 'pending', 'archived');

-- tasksテーブルの作成
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority priority_level NOT NULL DEFAULT 'medium',
  time_period TEXT, -- 時間帯（例: 'morning', 'afternoon', 'evening'）
  parent_task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  sort_order INTEGER DEFAULT 0, -- タスクの順序（同じ親の中での並び順）
  status task_status NOT NULL DEFAULT 'pending',
  due_date DATE, 
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ NULL, -- 完了日時
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
  
  -- インデックス用の制約
  CONSTRAINT valid_parent_task CHECK (id != parent_task_id)
);

-- タスクタグテーブル
CREATE TABLE task_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    tag_name VARCHAR(50) NOT NULL,
    color VARCHAR(7) DEFAULT '#6366f1', -- HEXカラーコード
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(task_id, tag_name)
);

-- ユーザー設定テーブルを作成
CREATE TABLE user_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    setting_key VARCHAR(100) NOT NULL,
    setting_value JSONB NOT NULL,
    setting_type VARCHAR(50) NOT NULL DEFAULT 'string', -- string, number, boolean, object, array
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE, -- 他のユーザーに公開するかどうか
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- ユーザー毎、キー毎に1つの設定のみ
    UNIQUE(user_id, setting_key)
);

-- 設定グループテーブル（設定の分類管理）
CREATE TABLE user_setting_groups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    group_key VARCHAR(100) NOT NULL UNIQUE,
    group_name VARCHAR(200) NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_system BOOLEAN DEFAULT FALSE, -- システム設定かどうか
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 設定定義テーブル（設定項目のメタデータ）
CREATE TABLE user_setting_definitions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    group_key VARCHAR(100) REFERENCES user_setting_groups(group_key) ON DELETE SET NULL,
    setting_name VARCHAR(200) NOT NULL,
    description TEXT,
    setting_type VARCHAR(50) NOT NULL, -- string, number, boolean, select, multiselect, range, datetime, json
    default_value JSONB NOT NULL,
    validation_rules JSONB, -- バリデーションルール（min, max, pattern, options等）
    display_order INTEGER DEFAULT 0,
    is_required BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT FALSE, -- 他のユーザーに表示可能かどうか
    is_system BOOLEAN DEFAULT FALSE, -- システム設定かどうか
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);



-- 更新日時を自動更新するトリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- プロフィールテーブルの更新トリガー
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- taskテーブルの更新トリガー
CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ユーザー設定テーブルの更新トリガー
CREATE TRIGGER update_user_settings_updated_at 
  BEFORE UPDATE ON user_settings 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- user_setting_definitionsテーブルの更新トリガー
CREATE TRIGGER update_user_setting_definitions_updated_at 
  BEFORE UPDATE ON user_setting_definitions 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();


-- デフォルト設定を挿入するファンクション
CREATE OR REPLACE FUNCTION create_default_user_settings()
RETURNS TRIGGER AS $$
DECLARE
    setting_def RECORD;
    insert_count INTEGER := 0;
BEGIN
    -- デバッグログ
    RAISE LOG 'Creating default settings for user: %', NEW.id;
    
    -- 各設定定義に基づいてデフォルト値を挿入
    FOR setting_def IN 
        SELECT 
            setting_key, 
            default_value, 
            setting_type,
            description
        FROM user_setting_definitions 
        WHERE is_system = true
        ORDER BY display_order
    LOOP
        BEGIN
            INSERT INTO user_settings (
                user_id, 
                setting_key, 
                setting_value, 
                setting_type,
                description
            )
            VALUES (
                NEW.id, 
                setting_def.setting_key, 
                setting_def.default_value, 
                setting_def.setting_type,
                setting_def.description
            )
            ON CONFLICT (user_id, setting_key) DO NOTHING;
            
            insert_count := insert_count + 1;
            
        EXCEPTION 
            WHEN OTHERS THEN
                RAISE WARNING 'Failed to create setting % for user %: %', 
                    setting_def.setting_key, NEW.id, SQLERRM;
        END;
    END LOOP;
    
    RAISE LOG 'Created % default settings for user %', insert_count, NEW.id;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error in create_default_user_settings for user %: %', NEW.id, SQLERRM;
        RETURN NEW; -- トリガーエラーでユーザー作成を阻害しないようにする
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_complete_user_settings()
RETURNS TRIGGER AS $$
DECLARE
    setting_def RECORD;
    insert_count INTEGER := 0;
BEGIN
    RAISE LOG 'Creating complete settings for user: %', NEW.id;
    
    -- すべての設定定義に基づいて初期値を挿入
    FOR setting_def IN 
        SELECT 
            setting_key, 
            default_value, 
            setting_type,
            description,
            is_required
        FROM user_setting_definitions 
        ORDER BY display_order
    LOOP
        BEGIN
            INSERT INTO user_settings (
                user_id, 
                setting_key, 
                setting_value, 
                setting_type,
                description
            )
            VALUES (
                NEW.id, 
                setting_def.setting_key, 
                setting_def.default_value, 
                setting_def.setting_type,
                setting_def.description
            )
            ON CONFLICT (user_id, setting_key) DO NOTHING;
            
            insert_count := insert_count + 1;
            
        EXCEPTION 
            WHEN OTHERS THEN
                RAISE WARNING 'Failed to create setting % for user %: %', 
                    setting_def.setting_key, NEW.id, SQLERRM;
        END;
    END LOOP;
    
    RAISE LOG 'Created % complete settings for user %', insert_count, NEW.id;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Error in create_complete_user_settings for user %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql;



-- 新規ユーザー登録時に自動でデフォルト設定を作成
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION create_default_user_settings();

