import React, { useEffect } from 'react';
import NavBar from '@app/Components/NavBar';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import UniversalForm from '@app/Components/UniversalForm';

const SIGN_UP = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'Reģistrācija - Piecinieks';
    });

    const [signUp, { loading, error, client }] = useMutation(SIGN_UP, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.signUp);
            client.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: false } });
            navigate('/');
        }
    });

    return (
        <div className="h-full flex flex-col">
            <NavBar />
            <UniversalForm action={signUp} formType="signUp" />
        </div>
    );
};

export default SignUp;
