import React, { useEffect } from 'react';
import NavBar from '@app/Components/NavBar';
import UniversalForm from '@app/Components/UniversalForm';
import { useLogin } from '@app/Hooks/useLogin';
import Container from '@app/Components/Container';

const SignIn = () => {
    const { signIn, redirectIfLoggedIn } = useLogin();
    redirectIfLoggedIn();

    useEffect(() => {
        document.title = 'Ienākt - Piecinieks';
    });

    return (
        <Container>
            <NavBar />
            <UniversalForm action={signIn} formType="signIn" />
        </Container>
    );
};

export default SignIn;
