import React from 'react';
import { ReactComponent as Wrong } from './assets/x-circle.svg';
import { ReactComponent as Correct } from './assets/check-circle.svg';

type AnswerProps = {
    correctAnswer: any;
    submittedAnswer: any;
    questionNumber: number;
    totalQuestions: number;
    handleShowResult: any;
    handleRequestQuestion: any;
};

const Answer: React.FC<AnswerProps> = ({
    correctAnswer,
    submittedAnswer,
    questionNumber,
    totalQuestions,
    handleShowResult,
    handleRequestQuestion
}) => {
    const { question, isCorrect, acceptedAnswers } = correctAnswer;

    return (
        <div className="flex flex-col h-full justify-between">
            <div>
                <div className="font-question mb-10">{question}</div>
                <div className="pl-8 relative mb-6">
                    <span className="absolute left-1 top-5">
                        {isCorrect ? <Correct height={24} width={24} /> : <Wrong height={24} width={24} />}
                    </span>
                    <span className="text-sm block">Tava Atbilde:</span>
                    <span className="italic font-extrabold text-lg">{submittedAnswer}</span>
                </div>
                <div className="pl-8">
                    <span className="text-sm block">Pieņemtās atbildes:</span>
                    <span className="italic font-extrabold text-lg">{acceptedAnswers}</span>
                </div>
            </div>
            <button
                className="cursor-pointer rounded-full w-full bg-custom-orange h-11 uppercase font-bold text-cream"
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
