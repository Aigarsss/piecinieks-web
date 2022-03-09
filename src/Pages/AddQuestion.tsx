import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

const AddQuestion = () => {

    useEffect(() => {
        document.title = 'Pievienot jautājumu - Piecinieks';
    });

    return (
        <div>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/addQuestion">Pievienot</Link>
            </nav>
            Add question
        </div>
    );
};

export default AddQuestion;