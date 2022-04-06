import { gql } from '@apollo/client';

export const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

export const ME = gql`
    query {
        me {
            id
            username
            admin
        }
    }
`;

export const GET_QUESTIONS = gql`
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
