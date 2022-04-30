import React, { useState } from 'react';
import {Link} from "react-router-dom";

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
        <form className="flex flex-col items-center justify-center h-full bg-cream px-5" onSubmit={handleSubmit}>
            <h1 className="text-custom-black font-bold text-xl pb-3">
                {formType === 'signUp' ? 'Reģistrēties' : 'Ienākt'}
            </h1>
            <div className="relative z-0 mb-6 w-64 group">
                <input
                    className="block py-2.5 px-0 w-full text-sm text-custom-black bg-transparent border-0 border-b-2 border-custom-black appearance-none focus:outline-none focus:ring-0 focus:border-custom-orange peer"
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    placeholder=" "
                />
                <label
                    htmlFor="answer"
                    className="absolute text-sm text-custom-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-custom-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    E-pasts
                </label>
            </div>

            {formType === 'signUp' && (
                <div className="relative z-0 mb-6 w-64 group">
                    <input
                        className="block py-2.5 px-0 w-full text-sm text-custom-black bg-transparent border-0 border-b-2 border-custom-black appearance-none focus:outline-none focus:ring-0 focus:border-custom-orange peer"
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        placeholder=" "
                    />
                    <label
                        htmlFor="answer"
                        className="absolute text-sm text-custom-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-custom-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Lietotājvārds
                    </label>
                </div>
            )}
            <div className="relative z-0 mb-6 w-64 group">
                <input
                    className="block py-2.5 px-0 w-full text-sm text-custom-black bg-transparent border-0 border-b-2 border-custom-black appearance-none focus:outline-none focus:ring-0 focus:border-custom-orange peer"
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    placeholder=" "
                />
                <label
                    htmlFor="answer"
                    className="absolute text-sm text-custom-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-custom-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Parole
                </label>
            </div>
            {formType === 'signUp' ?
                <p className="text-custom-black mb-3">Tev jau ir konts? <Link to={'/signIn'} className="font-bold text-custom-orange">Ienāc.</Link></p> :
                <p className="text-custom-black mb-3">Tev vēl nav konts? <Link to={'/signUp'} className="font-bold text-custom-orange">Reģistrējies.</Link></p>}
            <input type="submit" value="Turpināt" className="cursor-pointer rounded-full w-64 bg-custom-orange h-11 uppercase font-bold text-cream" />
        </form>
    );
};

export default UniversalForm;
