import React, { useEffect } from 'react';
import NavBar from '@app/Components/NavBar';

const Home = () => {
    useEffect(() => {
        document.title = 'Sākums - Piecinieks';
    });

    return (
        <div>
            <NavBar />
            Home.
        </div>
    );
};

export default Home;
