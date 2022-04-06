import { ApolloError, useQuery } from '@apollo/client';
import { ME } from '@app/gql/Queries';

type UseLogin = {
    loading: boolean;
    error: ApolloError | undefined;
    isAdmin: boolean;
};

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
