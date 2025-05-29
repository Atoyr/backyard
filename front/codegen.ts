import { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnv } from 'vite';

const mode = process.env.NODE_ENV || 'local-dev';
const env = loadEnv(mode, process.cwd(), '');

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

const config: CodegenConfig = {
  overwrite: true, 
  // SupabaseのGraphQLエンドポイント
  // `apikey`パラメーターは手前のAPI Gatewayを通るのに必要
  schema: [{
    [`${supabaseUrl}/graphql/v1`]: {
      headers: {
        'Content-Type': 'application/json',
        'apiKey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
    },
  }], 
  // 型を生成するクエリーがどこのファイルに記載されているか。
  // 今回は`constants.ts`のみだが、今後の拡張性も考えてとりあえず全てのtsとtsxファイルを探すよう指定
  documents: ['./src/**/*.graphql'], 

  // 出力したファイルをどこに置くかの指定
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [
        'typescript', 
        'typescript-operations', 
        'typescript-vue-urql', 
        'fragment-matcher'
      ],
      presetConfig: {
        gqlTagName: 'gql',
      }, 
      config: {
        withCompositionFunctions: true, 
        scalars: {
          UUID: 'string',
          Date: 'string',
          Time: 'string',
          Datetime: 'string',
          JSON: 'any',
          BigInt: 'string',
          Opaque: 'any',
        },
      }
    }
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  ignoreNoDocuments: true,
};

export default config;
