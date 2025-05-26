import { CodegenConfig } from '@graphql-codegen/cli';
import { supabaseAnonKey, supabaseUrl } from './src/consts';

const config: CodegenConfig = {
  overwrite: true, 
  // SupabaseのGraphQLエンドポイント
  // `apikey`パラメーターは手前のAPI Gatewayを通るのに必要
  schema: `${supabaseUrl}/graphql/v1?apikey=${supabaseAnonKey}`,

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
        'typescript-bue-urql', 
        'fragment-matcher'
      ],
      presetConfig: {
        gqlTagName: 'gql',
      }, 
      config: {
        withCompositionFunctions: true
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;
