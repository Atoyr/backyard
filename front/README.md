# TODO アプリ Google認証 セットアップ手順

## 1. Supabaseプロジェクトの設定

### 1.1 Supabaseプロジェクト作成
1. [Supabase](https://supabase.com)にアクセスし、新しいプロジェクトを作成
2. プロジェクトのURLとanon keyを取得

### 1.2 Google OAuth設定
1. [Google Cloud Console](https://console.cloud.google.com/)でプロジェクトを作成
2. APIs & Services → Credentials で OAuth 2.0 Client ID を作成
3. 承認済みリダイレクトURIに以下を追加:
   ```
   https://your-project.supabase.co/auth/v1/callback
   ```
4. SupabaseのAuthentication → Providersで Google を有効化
5. Client IDとClient Secretを設定

### 1.3 データベーススキーマ作成
Supabaseの SQL Editor で提供されたSQLスキーマを実行

## 2. プロジェクトセットアップ

### 2.1 依存関係インストール
```bash
npm install
```

### 2.2 環境変数設定
`.env.example` を `.env` にコピーし、Supabaseの情報を設定:
```bash
cp .env.example .env
```

`.env` ファイルを編集:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2.3 shadcn-vue セットアップ
```bash
npx shadcn-vue@latest init
npx shadcn-vue@latest add button
npx shadcn-vue@latest add dropdown-menu
```

## 3. 開発サーバー起動
```bash
npm run dev
```

## 4. ファイル構成

```
src/
├── components/
│   ├── ui/           # shadcn-vue コンポーネント
│   ├── LoginForm.vue
│   └── AppHeader.vue
├── lib/
│   └── supabase.ts   # Supabaseクライアント
├── pages/
│   ├── AuthCallback.vue
│   ├── LoginPage.vue
│   └── TodoApp.vue
├── router/
│   └── index.ts      # Vue Router設定
├── stores/
│   └── auth.ts       # Pinia認証ストア
├── App.
