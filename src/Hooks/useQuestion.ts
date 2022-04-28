import { ApolloError, FetchResult, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CHECK_ANSWER, GET_QUESTIONS, GET_RANDOM_QUESTION } from '@app/gql/Queries';
import { ADD_QUESTION, DELETE_QUESTION } from '@app/gql/Mutations';

export type Question = {
    id: string;
    question: string;
    answer: string;
    acceptedAnswers: string;
    explanation: string;
    airedAt: string;
    createdAt: Date;
    updatedAt: Date;
    isCorrect?: boolean;
};

export type Questions = {
    questions: Array<Question>;
};

type UseQuestion = {
    allQuestions: Array<Question> | undefined | false;
    getRandomQuestion: any;
    getAnswerCheck: any;
    allQuestionsLoading: boolean;
    questionsError: ApolloError | undefined;
    handleDeleteQuestion: (questionId: string) => void;
    handleAddQuestion: (questionVariables: any) => Promise<FetchResult<{ addQuestion: Question }>>;
    isRandomQuestionLoading: boolean;
};

export const useQuestion = (): UseQuestion => {
    const {
        data: allQuestions,
        loading: allQuestionsLoading,
        error: questionsError
    } = useQuery<Questions>(GET_QUESTIONS);

    const [deleteQuestion, { loading: isDeleteLoading, error: hasDeleteError }] = useMutation(DELETE_QUESTION);

    const handleDeleteQuestion = async (questionId: string) => {
        await deleteQuestion({
            variables: {
                id: questionId
            },
            refetchQueries: [{ query: GET_QUESTIONS }]
        });
    };

    const [addQuestion, { loading: isAddQuestionLoading, error: hasAddQuestionError }] =
        useMutation<{ addQuestion: Question }>(ADD_QUESTION);

    const handleAddQuestion = async (questionVariables: any) => {
        return await addQuestion({
            variables: { ...questionVariables },
            refetchQueries: [{ query: GET_QUESTIONS }]
        });
    };

    const [
        getRandomQuestion,
        { called: getRandomQuestionCalled, loading: isRandomQuestionLoading, data: randomQuestion }
    ] = useLazyQuery<{ randomQuestion: Question }>(GET_RANDOM_QUESTION);

    const [getAnswerCheck, { called: getAnswerCheckCalled, loading: isAnswerCheckLoading, data: checkAnswer }] =
        useLazyQuery<{ checkAnswer: Question }>(CHECK_ANSWER);

    return {
        allQuestions: !allQuestionsLoading && allQuestions && allQuestions.questions,
        // randomQuestion: !randomQuestionLoading && randomQuestion && randomQuestion.randomQuestion,
        getRandomQuestion,
        getAnswerCheck,
        allQuestionsLoading,
        questionsError,
        handleDeleteQuestion,
        handleAddQuestion,
        isRandomQuestionLoading
    };
};
