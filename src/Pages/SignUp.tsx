import React, { useEffect, useState } from 'react';
import NavBar from '@app/Components/NavBar';
import { useMutation, useApolloClient, gql } from '@apollo/client';

const SIGN_UP = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const SignUp: React.FC = () => {
    const [values, setValues] = useState({});

    //add the mutation hook
    const [signUp, { loading, error }] = useMutation(SIGN_UP, {
        onCompleted: (data) => {
            // console.log the JSON Web Token when the mutation is complete
            console.log(data.signUp);
        }
    });

    useEffect(() => {
        document.title = 'Reģistrācija - Piecinieks';
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        signUp({
            variables: { ...values }
        });
    };

    const handleChange = (e: any) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="h-full flex flex-col">
            <NavBar />
            <form className="flex flex-col items-center justify-center h-full" onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-pasts"
                    className={'border border-indigo-500/100 mb-8'}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Lietotājs"
                    className={'border border-indigo-500/100 mb-8'}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Parole"
                    className={'border border-indigo-500/100 mb-8'}
                    onChange={handleChange}
                />

                <input type="submit" value="Reģistrēties" className="cursor-pointer" />
            </form>
        </div>
    );
};

export default SignUp;
