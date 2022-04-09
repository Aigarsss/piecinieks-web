import React from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '@app/Hooks/useLogin';

const NavBar = () => {
    const { isLoggedIn, handleLogOut } = useLogin();

    return (
        <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between mb-8">
            <div className="px-6 w-full flex flex-wrap items-center justify-between">
                <div className="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
                    <ul className="navbar-nav mr-auto flex lg:flex-row">
                        <li className="nav-item">
                            <Link
                                to="/"
                                className="nav-link rounded-lg block pr-2 lg:px-2 py-2 text-gray-600 hover:bg-blue-100 focus:text-gray-700 transition duration-300 ease-in-out"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/dashboard"
                                className="nav-link rounded-lg block pr-2 lg:px-2 py-2 text-gray-600 hover:bg-blue-100 focus:text-gray-700 transition duration-300 ease-in-out"
                            >
                                Dashboard
                            </Link>
                        </li>
                        {isLoggedIn ? (
                            <li className="nav-item flex justify-center items-center">
                                <button
                                    onClick={handleLogOut}
                                    className="relative bg-red-500 text-white p-2 text-sm rounded font-bold overflow-visible"
                                >
                                    Iziet
                                </button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item flex justify-center items-center">
                                    <Link
                                        to="/signUp"
                                        className="relative bg-blue-500 text-white p-2 text-sm rounded font-bold overflow-visible"
                                    >
                                        Reģistrēties
                                    </Link>
                                </li>
                                <li className="nav-item flex justify-center items-center">
                                    <Link
                                        to="/signIn"
                                        className="relative bg-blue-500 text-white p-2 text-sm rounded font-bold overflow-visible"
                                    >
                                        Ienākt
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
