import { gql } from '@apollo/client';

export const SIGN_UP = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

export const SIGN_IN = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password)
    }
`;

export const ADD_QUESTION = gql`
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

export const DELETE_QUESTION = gql`
    mutation deleteQuestion($id: ID!) {
        deleteQuestion(id: $id)
    }
`;
