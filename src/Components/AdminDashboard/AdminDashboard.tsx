import React, { useState } from 'react';
import QuestionTable from '@app/Components/QuestionTable';
import AddQuestionForm from '@app/Components/AddQuestionForm';
import { Question, useQuestion } from '@app/Hooks/useQuestion';
import Loader from '@app/Components/Loader';

type PageArea = 'add' | 'viewAll';

const AdminDashboard = () => {
    const [pageArea, setPageArea] = useState<PageArea>('add');
    const [addedQuestions, setAddedQuestions] = useState<Array<Question>>([]);
    const { allQuestions, allQuestionsLoading, handleDeleteQuestion } = useQuestion();

    const switchPageArea = (area: string) => {
        if (area === 'add') {
            setPageArea(area);
        }

        if (area === 'viewAll') {
            setPageArea(area);
        }
    };

    const handleDelete = async (itemId: string) => {
        handleDeleteQuestion(itemId);
        setAddedQuestions(addedQuestions.filter((item) => item.id !== itemId));
    };

    if (allQuestionsLoading) {
        return <Loader />;
    }
    return (
        <div>
            <div className="flex">
                <div className="ml-10 cursor-pointer" onClick={() => switchPageArea('add')}>
                    Ievadīt jautājumus
                </div>
                <div className="ml-10 cursor-pointer" onClick={() => switchPageArea('viewAll')}>
                    Visi jautājumi
                </div>
            </div>
            {pageArea === 'add' && (
                <AddQuestionForm addedQuestions={addedQuestions} setAddedQuestions={setAddedQuestions} />
            )}
            <QuestionTable questions={pageArea === 'add' ? addedQuestions : allQuestions} handleDelete={handleDelete} />
        </div>
    );
};

export default AdminDashboard;
