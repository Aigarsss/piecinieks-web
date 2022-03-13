import React, { useEffect } from 'react';
import NavBar from '@app/Components/NavBar';
import UniversalForm from '@app/Components/UniversalForm';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const SIGN_IN = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

const SignIn = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'Ienākt - Piecinieks';
    });

    const [signIn, { loading, error, client }] = useMutation(SIGN_IN, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.signIn);
            client.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: true } });
            navigate('/');
        }
    });

    return (
        <div className="h-full flex flex-col">
            <NavBar />
            <UniversalForm action={signIn} formType="signIn" />
        </div>
    );
};

export default SignIn;
