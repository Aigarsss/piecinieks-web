import React, { useState } from 'react';
import { useQuestion } from '@app/Hooks/useQuestion';

type FormValues = {
    question: string;
    answer: string;
    accepted_answer: string;
    explanation: string;
    air_date: string;
};

type AddQuestionFormProps = {
    addedQuestions: any;
    setAddedQuestions: any;
};

const formInitialValues = {
    question: '',
    answer: '',
    accepted_answer: '',
    explanation: '',
    air_date: ''
};

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ addedQuestions, setAddedQuestions }) => {
    const [formValue, setFormValue] = useState<FormValues>(formInitialValues);

    const { handleAddQuestion } = useQuestion();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const addedQuestion = await handleAddQuestion(formValue);

        // Clear all fields except the air date
        setFormValue({ ...formInitialValues, air_date: formValue.air_date });

        // Add Added question to local state
        if (addedQuestion.data?.addQuestion) {
            setAddedQuestions([addedQuestion.data?.addQuestion, ...addedQuestions]);
        }
    };

    const handleChange = (e: any) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form className="w-96 m-auto mb-8" onSubmit={handleSubmit}>
            <div className="relative z-0 mb-6 w-full group">
                <textarea
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    name="question"
                    id="question"
                    onChange={handleChange}
                    placeholder=" "
                    value={formValue.question}
                />
                <label
                    htmlFor="question"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Jaut??jums*
                </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
                <input
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    name="answer"
                    id="answer"
                    type="text"
                    onChange={handleChange}
                    placeholder=" "
                    value={formValue.answer}
                />
                <label
                    htmlFor="answer"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Pareiz?? atbilde*
                </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
                <input
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    name="accepted_answer"
                    id="accepted_answer"
                    type="text"
                    onChange={handleChange}
                    placeholder=" "
                    value={formValue.accepted_answer}
                />
                <label
                    htmlFor="accepted_answer"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Pie??emt??s atbildes*
                </label>
            </div>
            <div className="relative z-0 mb-6 w-full group">
                <textarea
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    name="explanation"
                    id="explanation"
                    onChange={handleChange}
                    placeholder=" "
                    value={formValue.explanation}
                />
                <label
                    htmlFor="explanation"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Skaidrojums
                </label>
            </div>
            <div className="grid xl:grid-cols-2 xl:gap-6">
                <div className="relative z-0 mb-6 w-full group">
                    <input
                        type="date"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        name="air_date"
                        id="air_date"
                        onChange={handleChange}
                        value={formValue.air_date}
                    />
                    <label
                        htmlFor="air_date"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Datums
                    </label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input
                        type="submit"
                        value="Saglab??t"
                        className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-800 dark:focus:ring-green-800 cursor-pointer"
                    />
                </div>
            </div>
        </form>
    );
};

export default AddQuestionForm;
