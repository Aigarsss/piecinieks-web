import React, { useEffect, useState } from 'react';
import NavBar from '@app/Components/NavBar';
import { useQuestion } from '@app/Hooks/useQuestion';
import StartQuiz from '@app/Components/StartQuiz';
import Result from '@app/Components/Result';
import Question from '@app/Components/Question';
import Answer from '@app/Components/Answer';
import { useSpring, animated, config } from 'react-spring';

const questionFormInitialValue = {
    question_count: 5,
    time_limit: 0
};

type QuestionForm = {
    question_count: number;
    time_limit: number;
};

const Home = () => {
    const { getRandomQuestion, getAnswerCheck } = useQuestion();
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

    useEffect(() => {
        document.title = 'Sākums - Piecinieks';
    });

    const handleRequestQuestion = async (e: any) => {
        e.preventDefault();

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

    const handleSubmitAnswer = async (e: any) => {
        e.preventDefault();
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
        background: isShowingResult || questionNumber === 0 ? 'linear-gradient(190deg, #FF3008 50%, #C60400 50%)' : 'linear-gradient(350deg, #FEF1E9 50%, #FFFFFF 50%)',
        config: config.gentle
    });

    return (
        <animated.div style={animation} className="container">
            {/*<NavBar />*/}
            {questionNumber === 0 && (
                <StartQuiz
                    questionFormValue={questionFormValue}
                    setQuestionFormValue={setQuestionFormValue}
                    handleRequestQuestion={handleRequestQuestion}
                />
            )}
            {isShowingQuestion && (
                <Question
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
    );
};

export default Home;
