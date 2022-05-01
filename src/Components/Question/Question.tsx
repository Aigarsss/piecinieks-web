import React, {useEffect, useState} from 'react';
import classes from './question.module.scss';
import { ReactComponent as ArrowRight } from './assets/arrow-right.svg';

type QuestionProps = {
    question: string;
    timeLimit: number;
    handleSubmitAnswer: () => void;
    setAnswerFormValue: (e: any) => void;
    answerFormValue: any;
};

const Question: React.FC<QuestionProps> = ({ question, timeLimit, handleSubmitAnswer, setAnswerFormValue, answerFormValue }) => {
    const [seconds, setSeconds] = useState(timeLimit);

    useEffect(() => {
        if (seconds !== -1) {
            let myInterval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    handleSubmitAnswer();
                }
            }, 1000)
            return () => {
                clearInterval(myInterval);
            };
        }
    });

    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return (
        <div className={`h-full flex flex-col justify-between pt-5 ${classes.question}`}>
            <div className="font-question mb-10 relative">
                {
                    seconds !== -1 && <span className="absolute -top-12 right-0 font-extrabold text-custom-orange text-xl">{`0${min}:${sec < 10 ? `0${sec}` : sec}`}</span>
                }
                {question}
            </div>
            <div className="relative">
                <input
                    type="button"
                    onClick={() => {
                        setAnswerFormValue('-');
                        handleSubmitAnswer();
                    }}
                    value="Nezinu"
                    className="absolute right-1 -top-12 cursor-pointer text-custom-red"
                />
                <input
                    className={classes.answerInput}
                    placeholder="Atbilde"
                    id="answer"
                    name="answer"
                    type="text"
                    onChange={(e: any) => setAnswerFormValue(e.target.value)}
                    value={answerFormValue}
                />
                <div className={classes.submitIcon} onClick={handleSubmitAnswer}>
                    <ArrowRight />
                </div>
            </div>
        </div>
    );
};

export default Question;
