import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

const NavBar = () => {
    const { data, client, loading } = useQuery(IS_LOGGED_IN);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        client.resetStore();
        client.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: false } });
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/addQuestion">Pievienot</Link>
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
