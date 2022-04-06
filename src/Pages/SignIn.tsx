import React, { useEffect } from 'react';
import NavBar from '@app/Components/NavBar';
import UniversalForm from '@app/Components/UniversalForm';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { IS_LOGGED_IN } from '@app/gql/Queries';
import { SIGN_IN } from '@app/gql/Mutations';

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
