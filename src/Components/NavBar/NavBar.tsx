import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '@app/Hooks/useLogin';
import { useNavBar } from '@app/Hooks/useNavBar';
import { ReactComponent as Menu } from './assets/menu.svg';
import { ReactComponent as X } from './assets/x.svg';
import { useSpring, animated, config } from 'react-spring';

const NavBar = () => {
    const { isLoggedIn, handleLogOut } = useLogin();
    const { isMenuOpen, handleShowMenu } = useNavBar();

    // TODO calculate height
    const animation = useSpring({
        height: isMenuOpen ? '145px' : '0',
        opacity: isMenuOpen ? '1' : '0',
        // transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
        config: config.gentle
    });

    const bgAnimation = useSpring({
        opacity: isMenuOpen ? '1' : '0',
        // transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
        config: config.gentle
    });

    return (
        <nav className=" py-4 bg-custom-orange absolute flex items-center w-full justify-between top-0 select-none">
            <div className="px-6 w-full flex flex-wrap items-center justify-between">
                <ul className="flex justify-between w-full">
                    <li className="nav-item">
                        <Link
                            to="/"
                            className="block text-2xl font-extrabold text-white hover:text-cream transition duration-300 ease-in-out"
                        >
                            5inieks
                        </Link>
                    </li>
                    <li className="nav-item flex items-center cursor-pointer" onClick={handleShowMenu}>
                        {
                            isMenuOpen ? <X width={24} height={24} /> : <Menu width={24} height={24} />
                        }
                    </li>
                </ul>
            </div>

            {isMenuOpen && (
                <div>
                    <animated.ul
                        style={animation}
                        className="mobileMenu absolute right-0 top-12 flex flex-col items-end bg-cream px-6 py-5 select-none z-10"
                    >
                        <li className="pb-4">
                            <Link to="/dashboard">Jautājumi</Link>
                        </li>
                        <li className="pb-4">Rezultāti</li>
                        <li className="text-custom-red">Iziet</li>
                    </animated.ul>
                    <animated.div
                        style={bgAnimation}
                        className="absolute bg-black h-width overflow-hidden bg-opacity-25 top-0 right-0 left-0 bottom-0 h-screen"
                        onClick={handleShowMenu}
                    >
                        {' '}
                    </animated.div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;

// <li className="nav-item">
//     <Link
//         to="/dashboard"
//         className="nav-link rounded-lg block pr-2 lg:px-2 py-2 text-gray-600 hover:bg-blue-100 focus:text-gray-700 transition duration-300 ease-in-out"
//     >
//         Dashboard
//     </Link>
// </li>
// {isLoggedIn ? (
//     <li className="nav-item flex justify-center items-center">
//         <button
//             onClick={handleLogOut}
//             className="relative bg-red-500 text-white p-2 text-sm rounded font-bold overflow-visible"
//         >
//             Iziet
//         </button>
//     </li>
// ) : (
//     <>
//         <li className="nav-item flex justify-center items-center">
//             <Link
//                 to="/signUp"
//                 className="relative bg-blue-500 text-white p-2 text-sm rounded font-bold overflow-visible"
//             >
//                 Reģistrēties
//             </Link>
//         </li>
//         <li className="nav-item flex justify-center items-center">
//             <Link
//                 to="/signIn"
//                 className="relative bg-blue-500 text-white p-2 text-sm rounded font-bold overflow-visible"
//             >
//                 Ienākt
//             </Link>
//         </li>
//     </>
// )}
