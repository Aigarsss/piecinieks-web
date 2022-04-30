import React from 'react';
import classes from './loader.module.scss';

const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center h-full bg-custom-orange h-52 w-52 m-auto rounded-full">
            <div className={classes.ldsEllipsis}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="font-color-cream italic font-extrabold opacity-80">Notiek ielāde</div>
        </div>
    );
};

export default Loader;
