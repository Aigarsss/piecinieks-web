import React, { useEffect, useState } from 'react';
import NavBar from '@app/Components/NavBar';
import { useQuestion } from '@app/Hooks/useQuestion';

const answerFormInitialValue = '';

const questionFormInitialValue = {
    question_count: 5,
    time_limit: 0
};

type QuestionForm = {
    question_count: any;
    time_limit: any;
};

const Home = () => {
    const { getRandomQuestion, getAnswerCheck } = useQuestion();
    const [usedIds, setUsedIds] = useState<Array<String>>([]);
    const [isShowingQuestion, setIsShowingQuestion] = useState(false);
    const [isShowingAnswer, setIsShowingAnswer] = useState(false);
    const [isShowingResult, setIsShowingResult] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<any>({});
    const [correctAnswer, setCorrectAnswer] = useState<any>({});
    const [answerFormValue, setAnswerFormValue] = useState<string>(answerFormInitialValue);
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

    const handleQuestionFormChange = (area: string, e: any) => {
        setQuestionFormValue({...questionFormValue, [area]: Number(e.target.value)});
    }

    return (
        <div style={{
            background: 'linear-gradient(193.55deg, #FF3008 48.41%, #C60400 48.42%)',
            height: '100%'
        }}>
            <NavBar />
            {/*TODO, move to component*/}
            {questionNumber === 0 && (
                <form onSubmit={(e: any) => handleRequestQuestion(e)} className="flex flex-col">

                    <div>Jautājumu skaits</div>

                    <label htmlFor="5">5</label>
                    <input name="5" id="5" value="5" checked={ questionFormValue['question_count'] === Number('5') } type="checkbox" onChange={(e) => handleQuestionFormChange('question_count', e)}/>
                    <label htmlFor="10">10</label>
                    <input name="10" id="10" value="10" checked={ questionFormValue['question_count'] === Number('10') } type="checkbox" onChange={(e) => handleQuestionFormChange('question_count',e)}/>
                    <label htmlFor="20">20</label>
                    <input name="20" id="20" value="20" checked={ questionFormValue['question_count'] === Number('20') } type="checkbox" onChange={(e) => handleQuestionFormChange('question_count',e)}/>

                    <div>Laika limits</div>

                    <label htmlFor="0">0</label>
                    <input name="0" id="0" value="0" checked={ questionFormValue['time_limit'] === Number('0') } type="checkbox" onChange={(e) => handleQuestionFormChange('time_limit',e)}/>
                    <label htmlFor="30">30s</label>
                    <input name="30" id="30" value="30" checked={ questionFormValue['time_limit'] === Number('30') } type="checkbox" onChange={(e) => handleQuestionFormChange('time_limit',e)}/>
                    <label htmlFor="60">1min</label>
                    <input name="60" id="60" value="60" checked={ questionFormValue['time_limit'] === Number('60') } type="checkbox" onChange={(e) => handleQuestionFormChange('time_limit',e)}/>

                    <input type="submit" value="Aiziet" />
                </form>
            )}
            {/*TODO, move to component*/}
            {isShowingQuestion && (
                <div>
                    <div>{currentQuestion.question}</div>
                    <form onSubmit={handleSubmitAnswer}>
                        <label htmlFor="answer">Atbilde: </label>
                        <input
                            id="answer"
                            name="answer"
                            type="text"
                            onChange={(e: any) => setAnswerFormValue(e.target.value)}
                            value={answerFormValue}
                        />
                        <input type="submit" value="Iesniegt" />
                    </form>
                </div>
            )}
            {/*TODO, move to component*/}
            {isShowingAnswer && (
                <div>
                    atbilde: {correctAnswer.isCorrect ? 'pareizi' : 'nepareizi'}
                    <button
                        onClick={(e: any) => {
                            if (questionNumber === questionFormValue.question_count) {
                                handleShowResult();
                            } else {
                                handleRequestQuestion(e);
                            }
                        }}
                    >
                        {questionNumber === questionFormValue.question_count ? 'Beigt' : 'Nākamais jautājums'}
                    </button>
                </div>
            )}
            {isShowingResult && (
                <div>
                    Apsveicu! Tavs rezultāts ir {result} pareizas atbildes no {questionFormValue.question_count}{' '}
                    jautājumiem.
                    <button onClick={handlePlayAgain}>Atpakaļ uz sākmu</button>
                </div>
            )}
        </div>
    );
};

export default Home;
