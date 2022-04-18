import React from 'react';

type QuestionProps = {
    questionNumber: number;
    handleSubmitAnswer: any;
    setAnswerFormValue: any;
    answerFormValue: any;
};

const Question: React.FC<QuestionProps> = ({
    questionNumber,
    handleSubmitAnswer,
    setAnswerFormValue,
    answerFormValue
}) => {
    return (
        <div>
            <div>{questionNumber}</div>
            <form onSubmit={handleSubmitAnswer} className="flex flex-col justify-between h-full">
                <div>
                    <label htmlFor="answer">Atbilde: </label>
                    <input
                        id="answer"
                        name="answer"
                        type="text"
                        onChange={(e: any) => setAnswerFormValue(e.target.value)}
                        value={answerFormValue}
                    />
                </div>
                <input type="submit" value="Iesniegt" />
            </form>
        </div>
    );
};

export default Question;
