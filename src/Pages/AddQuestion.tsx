import React, {useEffect} from 'react';
import NavBar from "@app/Components/NavBar";


const AddQuestion = () => {

    useEffect(() => {
        document.title = 'Pievienot jautājumu - Piecinieks';
    });

    return (
        <div>
            <NavBar />
            Add question
        </div>
    );
};

export default AddQuestion;