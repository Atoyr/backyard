import { createClient, Client, cacheExchange, fetchExchange } from '@urql/vue';
import { requestPolicyExchange } from '@urql/exchange-request-policy';

export interface GraphQLClientOptions {
  url: string;
  cacheTTL?: number;
}

export const GraphQLClient = (options: GraphQLClientOptions): Client => {
  return createClient({
    url: options.url,
    exchanges: [
      requestPolicyExchange({
        ttl: options.cacheTTL || 1000 * 60 * 5, // Default to 5 minutes
      }), 
      cacheExchange, 
      fetchExchange, 
    ],
  });
}
