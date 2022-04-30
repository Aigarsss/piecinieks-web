import React from 'react';
import classes from './loader.module.scss';

const Loader = () => {
    return (
        // <div
        //     style={{ borderTopColor: 'transparent' }}
        //     className="w-24 h-24 border-4 border-cream border-solid rounded-full animate-spin"
        // />
        <div className="flex flex-col content-center items-center">
            <div className={classes.ldsEllipsis}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="font-color-cream italic font-extrabold opacity-80">
                Notiek ielāde
            </div>
        </div>

    );
};

export default Loader;
