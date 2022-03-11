import React from 'react';
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/addQuestion">Pievienot</Link> |{" "}
            <Link to="/signUp">Reģistrēties</Link>
        </nav>
    );
};

export default NavBar;