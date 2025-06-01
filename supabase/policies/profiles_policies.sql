-- RLS (Row Level Security) の設定

-- RLS の有効化
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- プロフィールテーブルのポリシー
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

