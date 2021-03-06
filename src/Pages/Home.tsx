import React, { useEffect, useState } from 'react';
import { useQuestion } from '@app/Hooks/useQuestion';
import StartQuiz from '@app/Components/StartQuiz';
import Result from '@app/Components/Result';
import Question from '@app/Components/Question';
import Answer from '@app/Components/Answer';
import { useSpring, animated, config } from 'react-spring';
import Loader from '@app/Components/Loader';
import Container from '@app/Components/Container';

const questionFormInitialValue = {
    question_count: 5,
    time_limit: -1
};

type QuestionForm = {
    question_count: number;
    time_limit: number;
};

const Home = () => {
    const [usedIds, setUsedIds] = useState<Array<string>>([]);
    const [isShowingQuestion, setIsShowingQuestion] = useState<boolean>(false);
    const [isShowingAnswer, setIsShowingAnswer] = useState<boolean>(false);
    const [isShowingResult, setIsShowingResult] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<any>({});
    const [correctAnswer, setCorrectAnswer] = useState<any>({});
    const [answerFormValue, setAnswerFormValue] = useState<string>('');
    const [questionFormValue, setQuestionFormValue] = useState<QuestionForm>(questionFormInitialValue);
    const [questionNumber, setQuestionNumber] = useState<number>(0);
    const [result, setResult] = useState<number>(0);
    const { getRandomQuestion, getAnswerCheck, isRandomQuestionLoading } = useQuestion();

    useEffect(() => {
        document.title = 'Sākums - Piecinieks';
    });

    const handleRequestQuestion = async (e: any) => {
        e.preventDefault();

        // TODO. This should bemove to hook, but it doesnt work when put in there, returns undefined on first loads
        const { data } = await getRandomQuestion({
            variables: {
                usedIds: usedIds
            }
        });

        // Adds used question ID to query variable filter
        setUsedIds([...usedIds, data.randomQuestion[0].id]);
        setCurrentQuestion({ currentQuestion, ...data.randomQuestion[0] });
        setQuestionNumber(questionNumber + 1);
        // Show fetched question
        setIsShowingQuestion(true);
        setIsShowingAnswer(false);
        // Clear correct answer data and form
        setAnswerFormValue('');
        setCorrectAnswer({});
    };

    const handleSubmitAnswer = async () => {
        // https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/#:~:text=Typing%20onSubmit%2C%20with%20Uncontrolled%20components%20in%20a%20Form

        // Get answer value
        const { data } = await getAnswerCheck({
            variables: {
                id: currentQuestion.id,
                answer: answerFormValue
            }
        });

        setIsShowingQuestion(false);
        setCorrectAnswer({ currentQuestion, ...data.checkAnswer });
        if (data.checkAnswer.isCorrect) {
            setResult(result + 1);
        }
        setIsShowingAnswer(true);
    };

    const handleShowResult = () => {
        setIsShowingAnswer(false);
        setIsShowingResult(true);
    };

    const handlePlayAgain = () => {
        // Resets
        setIsShowingResult(false);
        setResult(0);
        setQuestionNumber(0);
        setQuestionFormValue(questionFormInitialValue);
        // Resets used Ids. If there are a lot of questions, could consider not to reset
        setUsedIds([]);
    };

    const animation = useSpring({
        background:
            isShowingResult || questionNumber === 0
                ? 'linear-gradient(190deg, #FF3008 50%, #C60400 50%)'
                : 'linear-gradient(350deg, #FEF1E9 50%, #FFFFFF 50%)',
        config: config.gentle
    });

    // Get random question loader
    if (isRandomQuestionLoading) {
        return (
            <Container>
                <animated.div style={animation} className="w-full h-full flex flex-col px-5 pb-12">
                    <Loader />
                    {questionNumber === 0 && (
                        <div className="text-cream">*Pirmā ielāde var aizņemt līdz pat 30 sekundes</div>
                    )}
                </animated.div>
            </Container>
        );
    }

    return (
        <Container>
            <animated.div style={animation} className="w-full h-full flex flex-col px-5 pb-12">
                {questionNumber === 0 && (
                    <StartQuiz
                        questionFormValue={questionFormValue}
                        setQuestionFormValue={setQuestionFormValue}
                        handleRequestQuestion={handleRequestQuestion}
                    />
                )}
                {(isShowingQuestion || isShowingAnswer) && (
                    <div className="pt-10 font-extrabold text-xl">
                        {questionNumber}/{questionFormValue.question_count}
                    </div>
                )}
                {isShowingQuestion && (
                    <Question
                        timeLimit={questionFormValue.time_limit}
                        question={currentQuestion.question}
                        handleSubmitAnswer={handleSubmitAnswer}
                        setAnswerFormValue={setAnswerFormValue}
                        answerFormValue={answerFormValue}
                    />
                )}
                {isShowingAnswer && (
                    <Answer
                        correctAnswer={correctAnswer}
                        submittedAnswer={answerFormValue}
                        questionNumber={questionNumber}
                        totalQuestions={questionFormValue.question_count}
                        handleShowResult={handleShowResult}
                        handleRequestQuestion={handleRequestQuestion}
                    />
                )}
                {isShowingResult && (
                    <Result result={result} questionFormValue={questionFormValue} handlePlayAgain={handlePlayAgain} />
                )}
            </animated.div>
        </Container>
    );
};

export default Home;
