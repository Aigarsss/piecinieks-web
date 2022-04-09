import React from 'react';

const Loader = () => {
    return (
        <div
            style={{ borderTopColor: 'transparent' }}
            className="w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin"
        />
    );
};

export default Loader;
