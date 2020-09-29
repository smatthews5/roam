import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql';
import { Cache, QueryInput, cacheExchange } from '@urql/exchange-graphcache';
import theme from '../theme';
import {
  MeDocument,
  LoginMutation,
  MeQuery,
  RegisterMutation,
  LogoutMutation,
  AddFavouriteMutation,
  CitiesFavouriteQuery,
  AddFavouriteMutationVariables,
} from '../generated/graphql';

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
          addFavourite: (result, args, cache, info) => {
            cache.invalidate({
              __typename: 'Favourite',
              id: (args as AddFavouriteMutationVariables).cityId,
            });
          },
          removeFavourite: (result, args, cache, info) => {
            cache.invalidate({
              __typename: 'Favourite',
              id: (args as AddFavouriteMutationVariables).cityId,
            });
          },
          // addFavourite: (_result, args, cache, info) => {
          //   betterUpdateQuery<AddFavouriteMutation, CitiesFavouriteQuery>(
          //     cache,
          //     { query: MeDocument },
          //     _result,
          //     (result, query) => void
          //   );
          // },
        },
      },
    }),
    fetchExchange,
  ],
});

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
