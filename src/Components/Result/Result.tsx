import React from 'react';

type ResultProps = {
    result: number;
    questionFormValue: any;
    handlePlayAgain: () => void;
};

const Result: React.FC<ResultProps> = ({ result, questionFormValue, handlePlayAgain }) => {
    return (
        <div className="flex flex-col justify-between h-full">
            <div>
                <div className="uppercase font-title font-color-cream pt-16 font-outline">Tavs</div>
                <div className="uppercase font-title font-color-cream mb-8">Rezultāts</div>
            </div>

            <span className="flex justify-center items-end">
                <span className="text-7xl font-extrabold italic text-cream">{result}</span>
                <span className="text-3xl font-extrabold italic text-cream">/ {questionFormValue.question_count}</span>
            </span>

            <button
                className="cursor-pointer rounded-full w-full bg-cream h-11 uppercase font-bold text-custom-red"
                onClick={handlePlayAgain}
            >
                Atpakaļ uz sākumu
            </button>
        </div>
    );
};

export default Result;
