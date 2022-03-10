import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import { useQuery, gql} from '@apollo/client'

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

type Questions = {
    questions: Array<{
        id: string;
        question: string;
        answer: string;
        acceptedAnswers: string;
        airedAt: any;
        createdAt: Date;
        updatedAt: Date;
    }>
}

const Home = () => {
    useEffect(() => {
        document.title = 'Sākums - Piecinieks';
    });

    const { data, loading, error } = useQuery<Questions>(GET_QUESTIONS);

    if (loading) return <div>Loading...</div>

    if (error) return <div>{error}</div>

    return (
        <div>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/addQuestion">Pievienot</Link> |{" "}
                <Link to="/signUp">Reģistrēties</Link>
            </nav>
            Home.
            <ul>
                {data && !error && data.questions.map(item => {
                    return (
                        <li key={item.id}>{item.question}</li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Home;