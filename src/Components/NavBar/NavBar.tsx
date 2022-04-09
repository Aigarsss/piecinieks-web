import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useLogin } from '@app/Hooks/useLogin';
import { IS_LOGGED_IN } from '@app/gql/Queries';

const NavBar = () => {
    const { data, client, loading } = useQuery(IS_LOGGED_IN);
    const { isAdmin } = useLogin();

    const handleLogOut = async () => {
        localStorage.removeItem('token');
        await client.resetStore();
        client.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: false } });
    };

    return (
        <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between mb-8">
            <div className="px-6 w-full flex flex-wrap items-center justify-between">
                {/*<div className="flex items-center">*/}
                {/*    <button*/}
                {/*        className="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"*/}
                {/*        type="button"*/}
                {/*        data-bs-toggle="collapse"*/}
                {/*        data-bs-target="#navbarSupportedContentY"*/}
                {/*        aria-controls="navbarSupportedContentY"*/}
                {/*        aria-expanded="false"*/}
                {/*        aria-label="Toggle navigation"*/}
                {/*    >*/}
                {/*        <svg*/}
                {/*            aria-hidden="true"*/}
                {/*            focusable="false"*/}
                {/*            data-prefix="fas"*/}
                {/*            className="w-5"*/}
                {/*            role="img"*/}
                {/*            xmlns="http://www.w3.org/2000/svg"*/}
                {/*            viewBox="0 0 448 512"*/}
                {/*        >*/}
                {/*            <path*/}
                {/*                fill="currentColor"*/}
                {/*                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"*/}
                {/*            ></path>*/}
                {/*        </svg>*/}
                {/*    </button>*/}
                {/*</div>*/}
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
                        {isAdmin && (
                            <li className="nav-item">
                                <Link
                                    to="/admin"
                                    className="nav-link rounded-lg block pr-2 lg:px-2 py-2 text-gray-600 hover:bg-blue-100 focus:text-gray-700 transition duration-300 ease-in-out"
                                >
                                    Admin
                                </Link>
                            </li>
                        )}
                        {!loading && data.isLoggedIn ? (
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
