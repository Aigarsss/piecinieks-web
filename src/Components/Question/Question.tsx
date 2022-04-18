import React from 'react';
import classes from './question.module.scss';
// import { ReactComponent as ArrowRight } from './assets/arrow-right.svg';

type QuestionProps = {
    question: string;
    handleSubmitAnswer: any;
    setAnswerFormValue: any;
    answerFormValue: any;
};

const Question: React.FC<QuestionProps> = ({
    question,
    handleSubmitAnswer,
    setAnswerFormValue,
    answerFormValue
}) => {
    return (
        <div className={`h-full flex flex-col justify-between ${classes.question}`}>
            <div className="font-question mb-10">{question}</div>
            <form className="relative">
                <input
                    className={classes.answerInput}
                    placeholder="Atbilde"
                    id="answer"
                    name="answer"
                    type="text"
                    onChange={(e: any) => setAnswerFormValue(e.target.value)}
                    value={answerFormValue}
                />
                <div className={classes.submitIcon} onClick={handleSubmitAnswer}>➜</div>
            </form>
        </div>
    );
};

export default Question;
