import { gql } from '@apollo/client';

export const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

export const ME = gql`
    query me {
        me {
            id
            username
            admin
        }
    }
`;

export const GET_QUESTIONS = gql`
    query questions {
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

export const GET_RANDOM_QUESTION = gql`
    query randomQuestion($usedIds: [String]) {
        randomQuestion(usedIds: $usedIds) {
            id
            question
        }
    }
`;

export const CHECK_ANSWER = gql`
    query checkAnswer($id: ID!, $answer: String) {
        checkAnswer(id: $id, answer: $answer) {
            id
            question
            answer
            acceptedAnswers
            explanation
            isCorrect
        }
    }
`;
