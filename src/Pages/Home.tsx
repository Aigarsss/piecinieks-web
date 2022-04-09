import React, { useEffect } from 'react';
import NavBar from '@app/Components/NavBar';

const Home = () => {
    useEffect(() => {
        document.title = 'Sākums - Piecinieks';
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Handle question request');
    };

    return (
        <div>
            <NavBar />
            <form onSubmit={(e: any) => handleSubmit(e)} className="flex flex-col">
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
        </div>
    );
};

export default Home;
