import React, { useEffect } from 'react';
import NavBar from '@app/Components/NavBar';
import UniversalForm from '@app/Components/UniversalForm';
import { useLogin } from '@app/Hooks/useLogin';

const SignUp: React.FC = () => {
    const { redirectIfLoggedIn, signUp } = useLogin();
    redirectIfLoggedIn();

    useEffect(() => {
        document.title = 'Reģistrācija - Piecinieks';
    });

    return (
        <div className="h-full flex flex-col">
            <NavBar />
            <UniversalForm action={signUp} formType="signUp" />
        </div>
    );
};

export default SignUp;
