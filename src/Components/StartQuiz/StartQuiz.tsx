import React from 'react';
import Checkbox from '@app/Components/Checkbox';

const questionCountValues = ['5', '10', '20'];
const questionTimeLimitValues = ['0', '30', '60'];

type StartQuizProps = {
    questionFormValue: any;
    setQuestionFormValue: any;
    handleRequestQuestion: any;
};

const StartQuiz: React.FC<StartQuizProps> = ({ questionFormValue, setQuestionFormValue, handleRequestQuestion }) => {
    const handleQuestionFormChange = (area: string, e: any) => {
        setQuestionFormValue({ ...questionFormValue, [area]: Number(e.target.value) });
    };

    return (
        <>
            <div className="uppercase font-title font-color-cream pt-16 font-outline">Lieliskais</div>
            <div className="uppercase font-title font-color-cream mb-8">Piecinieks</div>

            <form onSubmit={(e: any) => handleRequestQuestion(e)} className="flex flex-col justify-between h-full">
                <div>
                    <div className="font-color-cream italic font-extrabold mb-2">Jautājumu skaits:</div>
                    <div className="flex">
                        {questionCountValues.map((value) => {
                            return (
                                <Checkbox
                                    key={value}
                                    fieldType="question_count"
                                    label={value}
                                    value={value}
                                    checked={questionFormValue['question_count'] === Number(value)}
                                    onChange={handleQuestionFormChange}
                                />
                            );
                        })}
                    </div>

                    <div className="font-color-cream italic font-extrabold mb-2 mt-5">Sekundes atbildei:</div>
                    <div className="flex">
                        {questionTimeLimitValues.map((value) => {
                            return (
                                <Checkbox
                                    key={value}
                                    fieldType="time_limit"
                                    label={value === '0' ? '-' : value}
                                    value={value}
                                    checked={questionFormValue['time_limit'] === Number(value)}
                                    onChange={handleQuestionFormChange}
                                />
                            );
                        })}
                    </div>
                </div>
                <input
                    className="cursor-pointer rounded-full w-full bg-cream h-11 uppercase font-bold text-custom-red"
                    type="submit"
                    value="Aiziet"
                />
            </form>
        </>
    );
};

export default StartQuiz;
