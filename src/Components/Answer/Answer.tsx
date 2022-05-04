import React from 'react';
import { ReactComponent as Wrong } from './assets/x-circle.svg';
import { ReactComponent as Correct } from './assets/check-circle.svg';
import classes from './answer.module.scss';
import { Question } from '@app/Hooks/useQuestion';

type AnswerProps = {
    correctAnswer: Question;
    submittedAnswer: string;
    questionNumber: number;
    totalQuestions: number;
    handleShowResult: () => void;
    handleRequestQuestion: (e: any) => void;
};

const Answer: React.FC<AnswerProps> = ({
    correctAnswer,
    submittedAnswer,
    questionNumber,
    totalQuestions,
    handleShowResult,
    handleRequestQuestion
}) => {
    const { question, isCorrect, acceptedAnswers, explanation } = correctAnswer;

    return (
        <div className="flex flex-col h-full pt-5 justify-between">
            <div>
                <div className="font-question mb-10">{question}</div>
                <div className="pl-8 relative mb-6">
                    <span className={`absolute left-1 top-5 ${classes.stamp}`}>
                        {isCorrect ? <Correct height={24} width={24} /> : <Wrong height={24} width={24} />}
                    </span>
                    <span className="text-sm block">Tava Atbilde:</span>
                    <span className="italic font-extrabold text-lg">{submittedAnswer}</span>
                </div>
                <div className="pl-8">
                    <span className="text-sm block">Pieņemtās atbildes:</span>
                    <span className="italic font-extrabold text-lg">{acceptedAnswers}</span>
                </div>
                {explanation && (
                    <div className="pl-8 pt-4">
                        <span className="text-sm block">Skaidrojums:</span>
                        <span className="italic text-lg">{explanation}</span>
                    </div>
                )}
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
                {questionNumber === totalQuestions ? 'Skatīt rezultātu' : 'Tālāk'}
            </button>
        </div>
    );
};

export default Answer;
