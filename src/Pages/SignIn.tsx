import React, { useEffect } from 'react';
import NavBar from '@app/Components/NavBar';
import UniversalForm from '@app/Components/UniversalForm';
import { useLogin } from '@app/Hooks/useLogin';

const SignIn = () => {
    const { signIn, redirectIfLoggedIn } = useLogin();
    redirectIfLoggedIn();

    useEffect(() => {
        document.title = 'Ienākt - Piecinieks';
    });

    return (
        <div className="h-full flex flex-col">
            <NavBar />
            <UniversalForm action={signIn} formType="signIn" />
        </div>
    );
};

export default SignIn;
