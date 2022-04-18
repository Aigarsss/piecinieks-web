import React from 'react';

type ResultProps = {
    result: number;
    questionFormValue: any;
    handlePlayAgain: () => void;
};

const Result: React.FC<ResultProps> = ({ result, questionFormValue, handlePlayAgain }) => {
    return (
        <div>
            Apsveicu! Tavs rezultāts ir {result} pareizas atbildes no {questionFormValue.question_count} jautājumiem.
            <button onClick={handlePlayAgain}>Atpakaļ uz sākumu</button>
        </div>
    );
};

export default Result;
