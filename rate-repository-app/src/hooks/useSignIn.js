import { useMutation, gql, useApolloClient } from '@apollo/client'

import useAuthStorage from '../hooks/useAuthStorage';

const AUTHENTICATE = gql`
    mutation Authenticate($credentials: AuthenticateInput!){
        authenticate(credentials: $credentials){
            accessToken
        }
    }
`

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });

    if (data?.authenticate?.accessToken) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      await apolloClient.resetStore(); // Clear cache and refetch
    }

    return data;
  };

  return [signIn, result];
};

export default useSignIn