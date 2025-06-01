# データベース管理

## フォルダ構成

```
supabase/
├── migrations/          # データベースマイグレーション
├── seed/               # 初期データ・テストデータ
├── functions/          # Edge Functions
├── policies/           # RLSポリシー（分割管理用）
├── config/             # Supabase設定
└── scripts/            # 管理スクリプト
```

## マイグレーションファイルの命名規則

- `001_initial_schema.sql` - 初期スキーマ

**命名規則:**
- 3桁の連番で開始
- アンダースコア区切り
- 簡潔で分かりやすい名前
- `.sql` 拡張子

## 開発ワークフロー

### 1. 新しいマイグレーション作成
```bash
# back/ ディレクトリで実行
touch supabase/migrations/004_add_new_feature.sql
```

### 2. マイグレーション実行
> FIXME
```bash
# 本番環境
# npm run db:migrate

# ローカル開発環境
# npm run supabase:start
# npm run db:migrate
```

### 3. 型定義の更新
> FIXME
```bash
npm run types:generate
```

### 4. フロントエンドでの型使用

## 本番デプロイ手順

### 1. Supabaseプロジェクトへのマイグレーション適用
```bash
# Supabase CLIでログイン
npx supabase login

# プロジェクトと連携
npx supabase link --project-ref YOUR_PROJECT_ID

# マイグレーション適用
npx supabase db push
```

### 2. 環境変数設定
```bash
# .env ファイル
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_PROJECT_ID=your-project-id
```

## ベストプラクティス

### マイグレーション
- **小さな変更**に分割して管理
- **ロールバック可能**な設計
- **本番適用前**にローカルでテスト
- **破壊的変更**は段階的に実施

### RLSポリシー
- **最小権限の原則**を適用
- **テストケース**を含めて管理
- **ポリシー名**は分かりやすく

### 型安全性
- **自動生成**された型定義を使用
- **マイグレーション後**は型を再生成
- **フロントエンド**でも同じ型を使用

## トラブルシューティング

### マイグレーション失敗時
```bash
# ローカル環境のリセット
npm run supabase:stop
npm run supabase:start
npm run db:reset
```

### 型定義の不整合
```bash
# 型定義の再生成
npm run types:generate
```

### 本番環境の確認
```bash
# Supabase CLIでスキーマ確認
npx supabase db diff
```
