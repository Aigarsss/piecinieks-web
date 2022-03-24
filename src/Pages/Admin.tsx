import React, {useEffect, useState} from 'react';
import NavBar from '@app/Components/NavBar';
import { gql, useMutation, useQuery } from '@apollo/client';

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
    mutation addQuestion($question: String!, $answer: String!, $accepted_answer: String!, $explanation: String, $air_date: String) {
        addQuestion(question: $question, answer: $answer, acceptedAnswers: $accepted_answer, explanation: $explanation, airedAt: $air_date) {
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

const Admin = () => {
    const [value, setValue] = useState({});
    // const [displayQuestions, setDisplayQuestions] = useState<Array<Question>>([]);
    const { data, loading: questionsLoading, error: questionsError } = useQuery<Questions>(GET_QUESTIONS);
    const [addQuestion, { loading, error }] = useMutation<{ addQuestion: Question }>(ADD_QUESTION);
    const [deleteQuestion, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_QUESTION);

    // useEffect(()=> {
    //     if (!questionsLoading && data?.questions) {
    //         setDisplayQuestions(data.questions)
    //     }
    // }, [data]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const addedQuestion = await addQuestion({
            variables: { ...value }
        });

        // if (addedQuestion.data?.addQuestion) {
        //     setDisplayQuestions([addedQuestion.data?.addQuestion, ...displayQuestions])
        // }

        window.location.reload();
    };

    const handleChange = (e: any) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const handleDelete = async (itemId: any) => {
        await deleteQuestion({
            variables: {
                id: itemId
            }
        });

        window.location.reload();
    };

    if (questionsLoading) {
        return <div>Loading</div>;
    }

    return (
        <div>
            <NavBar />
            <form className="w-96 m-auto mb-8" onSubmit={handleSubmit}>
                <div className="relative z-0 mb-6 w-full group">
                    <textarea
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        name="question"
                        id="question"
                        onChange={handleChange}
                        placeholder=" "
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

            <section className="flex flex-col antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
                <div className="h-full">
                    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                        <header className="px-5 py-4 border-b border-gray-100">
                            <h2 className="font-semibold text-gray-800">Visi jautājumi</h2>
                        </header>
                        <div className="p-3">
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                        <tr>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Jautājums</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Atbilde</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Pieņemtās atbildes</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-left">Skaidrojums</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Datums</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semibold text-center">Dzēst</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {!loading &&
                                            !error &&
                                            data &&
                                            data.questions.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td className="p-2">
                                                            <div className="flex items-center">
                                                                <div className="font-medium text-gray-800">
                                                                    {item.question}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-2">
                                                            <div className=" font-medium text-green-500">
                                                                {item.answer}
                                                            </div>
                                                        </td>
                                                        <td className="p-2">
                                                            <div className="text-left">{item.acceptedAnswers}</div>
                                                        </td>
                                                        <td className="p-2">
                                                            <div className="text-left">{item.explanation && item.explanation}</div>
                                                        </td>
                                                        <td className="p-2">
                                                            <div className="text-left whitespace-nowrap">
                                                                {item.airedAt && item.airedAt}
                                                            </div>
                                                        </td>
                                                        <td className="p-2">
                                                            <div className="text-lg font-medium text-center">
                                                                <span className="px-4 py-2 rounded-full text-white bg-red-500 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-red-700 transition duration-300 ease">
                                                                    Dzēst
                                                                    <button
                                                                        className="bg-transparent hover focus:outline-none"
                                                                        onClick={() => handleDelete(item.id)}
                                                                    >
                                                                        <svg
                                                                            aria-hidden="true"
                                                                            focusable="false"
                                                                            data-prefix="fas"
                                                                            data-icon="times"
                                                                            className="w-3 ml-3"
                                                                            role="img"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 352 512"
                                                                        >
                                                                            <path
                                                                                fill="currentColor"
                                                                                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                                                                            ></path>
                                                                        </svg>
                                                                    </button>
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
