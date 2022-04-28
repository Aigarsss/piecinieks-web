import React from 'react';

const Loader = () => {
    return (
        <div
            style={{ borderTopColor: 'transparent' }}
            className="w-24 h-24 border-4 border-cream border-solid rounded-full animate-spin"
        />
    );
};

export default Loader;
