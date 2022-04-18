import React from 'react';

type AnswerProps = {
    isCorrect: boolean;
    questionNumber: number;
    totalQuestions: number;
    handleShowResult: any;
    handleRequestQuestion: any;
};

const Answer: React.FC<AnswerProps> = ({
    isCorrect,
    questionNumber,
    totalQuestions,
    handleShowResult,
    handleRequestQuestion
}) => {
    return (
        <div>
            atbilde: {isCorrect ? 'pareizi' : 'nepareizi'}
            <button
                onClick={(e: any) => {
                    if (questionNumber === totalQuestions) {
                        handleShowResult();
                    } else {
                        handleRequestQuestion(e);
                    }
                }}
            >
                {questionNumber === totalQuestions ? 'Beigt' : 'Nākamais jautājums'}
            </button>
        </div>
    );
};

export default Answer;
