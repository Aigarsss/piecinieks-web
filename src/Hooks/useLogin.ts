import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { IS_LOGGED_IN, ME } from '@app/gql/Queries';
import { SIGN_IN, SIGN_UP } from '@app/gql/Mutations';
import { useLocation, useNavigate } from 'react-router-dom';

type UseLogin = {
    isLoadingMe: boolean;
    hasMeError: ApolloError | undefined;
    isAdmin: boolean;
    isLoggedIn: boolean;
    signIn: () => void;
    signUp: () => void;
    redirectIfLoggedIn: () => void;
};

type Location = {
    state: {
        from?: string;
    };
};

// TODO error handlings
export const useLogin = (): UseLogin => {
    const navigate = useNavigate();
    const location = useLocation() as Location;

    // Handle logged in status, including admin status
    const {
        data,
        loading: isLoadingMe,
        error: hasMeError
    } = useQuery(ME, {
        fetchPolicy: 'cache-and-network'
    });

    const isLoggedIn = !isLoadingMe && !hasMeError && data?.me;
    const isAdmin = !isLoadingMe && !hasMeError && data?.me?.admin;

    // Handle signing in
    const [signIn, { loading: isLoadingSignIn, error: hasSignInError, client: signInClient }] = useMutation(SIGN_IN, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.signIn);
            signInClient.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: true } });

            // Checks if user was redirected here from a different page
            // TODO, not sure if this typing is ok
            if (location.state?.from) {
                navigate(location.state?.from);
            }
        }
    });

    // Handle signing up
    const [signUp, { loading: isLoadingSignUp, error: hasSignUpError, client: signUpClient }] = useMutation(SIGN_UP, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.signUp);
            // User not logged in after registration
            signUpClient.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: false } });
            navigate('/');
        }
    });

    const redirectIfLoggedIn = () => {
        if (isLoggedIn) {
            navigate('/');
        }
    };

    return {
        isLoadingMe,
        hasMeError,
        isAdmin,
        isLoggedIn,
        signIn,
        signUp,
        redirectIfLoggedIn
    };
};
