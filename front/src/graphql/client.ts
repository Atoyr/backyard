// FIXME: this file is sqmple and should be removed in the future
import { Client, cacheExchange, fetchExchange } from '@urql/vue';

export const client = new Client({
  url: 'http://localhost:3000/graphql',
  exchanges: [cacheExchange, fetchExchange],
});
