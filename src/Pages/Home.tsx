import React, { useEffect, useState } from 'react';
import NavBar from '@app/Components/NavBar';
import { useQuestion } from '@app/Hooks/useQuestion';

// Check if it makes sense to use controlled inputs
const formInitialValue = {
    answer: ''
};

type Answer = {
    answer?: string;
};

const Home = () => {
    const { getRandomQuestion, getAnswerCheck } = useQuestion();
    const [usedIds, setUsedIds] = useState<Array<String>>([]);
    const [isShowingQuestion, setIsShowingQuestion] = useState(false);
    const [isShowingAnswer, setIsShowingAnswer] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<any>({});
    const [correctAnswer, setCorrectAnswer] = useState<any>({});
    const [answerFormValue, setAnswerFormValue] = useState<Answer>(formInitialValue);

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

        // Show fetched question
        setIsShowingQuestion(true);
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

        setCorrectAnswer({ currentQuestion, ...data.checkAnswer });
        setIsShowingAnswer(true);
    };

    return (
        <div>
            <NavBar />
            {/*TODO, move to component*/}
            <form onSubmit={(e: any) => handleRequestQuestion(e)} className="flex flex-col">
                <label htmlFor="question_count">Jautājumu skaits</label>
                <select name="question_count" id="question_count">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
                <label htmlFor="time_limit">Laika limits</label>
                <select name="time_limit" id="time_limit">
                    <option value="0">No limit</option>
                    <option value="30">30s</option>
                    <option value="60">1min</option>
                    <option value="120">2min</option>
                </select>
                <input type="submit" value="Aiziet" />
            </form>
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
                        />
                        <input type="submit" value="Iesniegt" />
                    </form>
                </div>
            )}
            {/*TODO, move to component*/}
            {isShowingAnswer && <div>atbilde: {correctAnswer.isCorrect ? 'pareizi' : 'nepareizi'}</div>}
        </div>
    );
};

export default Home;
