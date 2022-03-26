import React, { useState } from 'react';
import NavBar from '@app/Components/NavBar';
import { gql, useMutation, useQuery } from '@apollo/client';
import QuestionTable from '@app/Components/QuestionTable';

const GET_QUESTIONS = gql`
    query {
        questions {
            id
            question
            answer
            acceptedAnswers
            explanation
            airedAt
            createdAt
            updatedAt
        }
    }
`;

const ADD_QUESTION = gql`
    mutation addQuestion(
        $question: String!
        $answer: String!
        $accepted_answer: String!
        $explanation: String
        $air_date: String
    ) {
        addQuestion(
            question: $question
            answer: $answer
            acceptedAnswers: $accepted_answer
            explanation: $explanation
            airedAt: $air_date
        ) {
            id
            question
            answer
            acceptedAnswers
            explanation
            airedAt
            createdAt
            updatedAt
        }
    }
`;

const DELETE_QUESTION = gql`
    mutation deleteQuestion($id: ID!) {
        deleteQuestion(id: $id)
    }
`;

type Question = {
    id: string;
    question: string;
    answer: string;
    acceptedAnswers: string;
    explanation: string;
    airedAt: string;
    createdAt: Date;
    updatedAt: Date;
};

type Questions = {
    questions: Array<Question>;
};

type PageArea = 'add' | 'viewAll';

const formInitialValues = {
    question: '',
    answer: '',
    accepted_answer: '',
    explanation: '',
    air_date: ''
};

type FormValues = {
    question: string;
    answer: string;
    accepted_answer: string;
    explanation: string;
    air_date: string;
};

const Admin = () => {
    const [formValue, setFormValue] = useState<FormValues>(formInitialValues);
    const [addedQuestions, setAddedQuestions] = useState<Array<Question>>([]);
    const [pageArea, setPageArea] = useState<PageArea>('add');

    const { data, loading: questionsLoading, error: questionsError } = useQuery<Questions>(GET_QUESTIONS);
    const [addQuestion, { loading, error }] = useMutation<{ addQuestion: Question }>(ADD_QUESTION);
    const [deleteQuestion, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_QUESTION);

    const switchPageArea = (area: string) => {
        if (area === 'add') {
            setPageArea(area);
        }

        if (area === 'viewAll') {
            setPageArea(area);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const addedQuestion = await addQuestion({
            variables: { ...formValue }
        });

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

    const handleDelete = async (itemId: any) => {
        await deleteQuestion({
            variables: {
                id: itemId
            }
        });

        setAddedQuestions(addedQuestions.filter((item) => item.id !== itemId));
    };

    if (questionsLoading) {
        return <div>Loading</div>;
    }

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div>
            <NavBar />
            <div className="flex">
                <div className="ml-10 cursor-pointer" onClick={() => switchPageArea('add')}>
                    Ievadīt jautājumus
                </div>
                <div className="ml-10 cursor-pointer" onClick={() => switchPageArea('viewAll')}>
                    Visi jautājumi
                </div>
            </div>
            {pageArea === 'add' && (
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
                            Jautājums*
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
                            Pareizā atbilde*
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
                            Pieņemtās atbildes*
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
                                value="Saglabāt"
                                className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-800 dark:focus:ring-green-800 cursor-pointer"
                            />
                        </div>
                    </div>
                </form>
            )}

            <QuestionTable
                questions={pageArea === 'add' ? addedQuestions : data.questions}
                handleDelete={handleDelete}
            />

            {/*A toast*/}
            {/*<div x-show="open" className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60" x-data="{ open: true }">*/}
            {/*    <div className="bg-gray-800 text-gray-50 text-sm p-3 md:rounded shadow-lg flex justify-between">*/}
            {/*        <div>👉 <a className="hover:underline ml-1" href="#" target="_blank">Text</a></div>*/}
            {/*        <button className="text-gray-500 hover:text-gray-400 ml-5">*/}
            {/*        <span className="sr-only">Close</span>*/}
            {/*        <svg className="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 16 16">*/}
            {/*            <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />*/}
            {/*        </svg>*/}
            {/*    </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default Admin;
