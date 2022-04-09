import { ApolloError, FetchResult, useMutation, useQuery } from '@apollo/client';
import { GET_QUESTIONS } from '@app/gql/Queries';
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
};

export type Questions = {
    questions: Array<Question>;
};

type UseQuestion = {
    allQuestions: Array<Question> | undefined | false;
    allQuestionsLoading: boolean;
    questionsError: ApolloError | undefined;
    handleDeleteQuestion: (questionId: string) => void;
    handleAddQuestion: (questionVariables: any) => Promise<FetchResult<{ addQuestion: Question }>>;
};

export const useQuestion = (): UseQuestion => {
    const {
        data: allQuestions,
        loading: allQuestionsLoading,
        error: questionsError
    } = useQuery<Questions>(GET_QUESTIONS);
    const [deleteQuestion, { loading: isDeleteLoading, error: hasDeleteError }] = useMutation(DELETE_QUESTION);
    const [addQuestion, { loading: aisAddQuestionLoading, error: hasAddQuestionError }] =
        useMutation<{ addQuestion: Question }>(ADD_QUESTION);

    const handleDeleteQuestion = async (questionId: string) => {
        await deleteQuestion({
            variables: {
                id: questionId
            },
            refetchQueries: [{ query: GET_QUESTIONS }]
        });
    };

    const handleAddQuestion = async (questionVariables: any) => {
        return await addQuestion({
            variables: { ...questionVariables },
            refetchQueries: [{ query: GET_QUESTIONS }]
        });
    };

    return {
        allQuestions: !allQuestionsLoading && allQuestions && allQuestions.questions,
        allQuestionsLoading,
        questionsError,
        handleDeleteQuestion,
        handleAddQuestion
    };
};
