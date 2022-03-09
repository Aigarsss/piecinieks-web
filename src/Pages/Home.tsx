import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    useEffect(() => {
        document.title = 'Sākums - Piecinieks';
    });

    // console.log(import.meta.env.VITE_API_URI);

    return (
        <div>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/addQuestion">Pievienot</Link>
            </nav>
            Home
        </div>
    );
};

export default Home;