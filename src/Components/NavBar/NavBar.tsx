import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '@app/Hooks/useLogin';
import { useNavBar } from '@app/Hooks/useNavBar';
import { ReactComponent as Menu } from './assets/menu.svg';
import { ReactComponent as X } from './assets/x.svg';
import { ReactComponent as User } from './assets/user.svg';
import { useSpring, animated, config } from 'react-spring';

const NavBar = () => {
    const { isLoggedIn, handleLogOut, isAdmin } = useLogin();
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
        config: config.gentle
    });

    const logOut = () => {
        handleLogOut();
        handleShowMenu();
    };

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
                    {!isLoggedIn ? (
                        <li className="nav-item flex items-center cursor-pointer">
                            <Link to="/signIn">
                                <User width={24} height={24} />
                            </Link>
                        </li>
                    ) : (
                        <li className="nav-item flex items-center cursor-pointer" onClick={handleShowMenu}>
                            {isMenuOpen ? <X width={24} height={24} /> : <Menu width={24} height={24} />}
                        </li>
                    )}
                </ul>
            </div>

            {isMenuOpen && (
                <div>
                    <animated.ul
                        style={animation}
                        className="mobileMenu absolute right-0 top-12 flex flex-col items-end bg-cream px-6 py-5 select-none z-10"
                    >
                        {isAdmin && (
                            <li className="pb-4 cursor-pointer">
                                <Link to="/dashboard">Jautājumi</Link>
                            </li>
                        )}
                        {/*<li className="pb-4 cursor-pointer">Rezultāti</li>*/}
                        <li className="text-custom-red cursor-pointer" onClick={logOut}>
                            Iziet
                        </li>
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
