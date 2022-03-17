import { ApolloError, gql, useQuery } from '@apollo/client';

type UseLogin = {
    loading: boolean;
    error: ApolloError | undefined;
    isAdmin: boolean;
};

const ME = gql`
    query {
        me {
            id
            username
            admin
        }
    }
`;

export const useLogin = (): UseLogin => {
    const { data, loading, error } = useQuery(ME, {
        fetchPolicy: 'cache-and-network'
    });
    const isAdmin = !loading && !error && data?.me?.admin;

    return {
        loading,
        error,
        isAdmin
    };
};
