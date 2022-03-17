import React, { useState } from 'react';
import NavBar from '@app/Components/NavBar';
import { gql, useMutation, useQuery } from '@apollo/client';

const ADD_QUESTION = gql`
    mutation addQuestion($question: String!, $answer: String!, $accepted_answer: String!, $air_date: String) {
        addQuestion(question: $question, answer: $answer, acceptedAnswers: $accepted_answer, airedAt: $air_date) {
            question
        }
    }
`;

const GET_QUESTIONS = gql`
    query {
        questions {
            id
            question
            answer
            acceptedAnswers
            airedAt
            createdAt
            updatedAt
        }
    }
`;

type Question = {
    id: string;
    question: string;
    answer: string;
    acceptedAnswers: string;
    airedAt: any;
    createdAt: Date;
    updatedAt: Date;
};

type Questions = {
    questions: Array<Question>;
};

const Admin = () => {
    const [value, setValue] = useState({});
    const { data, loading: questionsLoading, error: questionsError } = useQuery<Questions>(GET_QUESTIONS);
    const [addQuestion, { loading, error }] = useMutation<Question>(ADD_QUESTION);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        addQuestion({
            variables: { ...value }
        });
        window.location.reload();
    };

    const handleChange = (e: any) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    if (questionsLoading) {
        return <div>Loading</div>;
    }

    return (
        <div>
            <NavBar />
            <form onSubmit={handleSubmit} className="flex flex-col w-80 m-auto">
                <textarea
                    name="question"
                    id="question"
                    placeholder="Jautājums"
                    className="border-solid border border-gray-500"
                    onChange={handleChange}
                />
                <input
                    name="answer"
                    id="answer"
                    type="text"
                    placeholder="Pareizā atbilde"
                    className="border-solid border border-gray-500"
                    onChange={handleChange}
                />
                <input
                    name="accepted_answer"
                    id="accepted_answer"
                    type="text"
                    placeholder="Pieņemtās atbildes"
                    className="border-solid border border-gray-500"
                    onChange={handleChange}
                />
                <input
                    name="air_date"
                    id="air_date"
                    type="date"
                    className="border-solid border border-gray-500"
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    value="Saglabāt"
                    className="relative bg-green-600 text-white p-2 text-sm rounded font-bold overflow-visible cursor-pointer"
                />
            </form>

            <ul>
                {!loading &&
                    !error &&
                    data &&
                    data.questions.map((item) => {
                        return (
                            <li key={item.id} className="flex">
                                <span>Jautājums: {item.question}</span>
                                <span>Atbilde: {item.answer}</span>
                                <span>Pieņemtā atbilde: {item.acceptedAnswers}</span>
                                <span>Ridījuma datums: {item.airedAt}</span>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default Admin;
