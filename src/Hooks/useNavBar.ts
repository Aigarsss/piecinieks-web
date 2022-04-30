import { useState } from 'react';

export const useNavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleShowMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return {
        isMenuOpen,
        handleShowMenu
    };
};
