import React, { useState } from 'react';

type UniversalFormProps = {
    action: ({}) => void;
    formType: 'signIn' | 'signUp';
};

const UniversalForm: React.FC<UniversalFormProps> = ({ action, formType }) => {
    const [values, setValues] = useState({});

    const handleSubmit = (e: any) => {
        e.preventDefault();
        action({
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
        <form className="flex flex-col items-center justify-center h-full" onSubmit={handleSubmit}>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="E-pasts"
                className={'border border-indigo-500/100 mb-8'}
                onChange={handleChange}
            />
            {formType === 'signUp' && (
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Lietotājs"
                    className={'border border-indigo-500/100 mb-8'}
                    onChange={handleChange}
                />
            )}
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Parole"
                className={'border border-indigo-500/100 mb-8'}
                onChange={handleChange}
            />
            <input type="submit" value="Turpināt" className="cursor-pointer" />
        </form>
    );
};

export default UniversalForm;
