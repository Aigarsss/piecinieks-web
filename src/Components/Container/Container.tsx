import React from 'react';
import NavBar from '@app/Components/NavBar';

const Container: React.FC = ({ children }) => {
    return (
        <div className="w-full h-full flex flex-col pt-12">
            <NavBar />
            {children}
        </div>
    );
};

export default Container;
