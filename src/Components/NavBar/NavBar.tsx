import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useLogin } from '@app/Hooks/useLogin';

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

const NavBar = () => {
    const { data, client, loading } = useQuery(IS_LOGGED_IN);
    const { isAdmin } = useLogin();

    const handleLogOut = () => {
        localStorage.removeItem('token');
        client.resetStore();
        client.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: false } });
    };

    return (
        <nav className="flex justify-around">
            <Link to="/">Home</Link>
            {isAdmin && <Link to="/admin">Admin</Link>}
            {!loading && data.isLoggedIn ? (
                <button
                    onClick={handleLogOut}
                    className="relative bg-red-500 text-white p-2 text-sm rounded font-bold overflow-visible"
                >
                    Iziet
                </button>
            ) : (
                <>
                    <Link
                        to="/signUp"
                        className="relative bg-blue-500 text-white p-2 text-sm rounded font-bold overflow-visible"
                    >
                        Reģistrēties
                    </Link>
                    <Link
                        to="/signIn"
                        className="relative bg-blue-500 text-white p-2 text-sm rounded font-bold overflow-visible"
                    >
                        Ienākt
                    </Link>
                </>
            )}
        </nav>
    );
};

export default NavBar;
