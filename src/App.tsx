import React, { ReactComponentElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import AddQuestion from './Pages/AddQuestion';
import SignUp from './Pages/SignUp';
import './App.css';
import SignIn from '@app/Pages/SignIn';
import { gql, useQuery } from '@apollo/client';

const ME = gql`
    {
        me {
            id
            username
            admin
        }
    }
`;

type PrivateAdminRouteProps = {
    component: () => ReactComponentElement<any>;
};

const PrivateAdminRoute: React.FC<PrivateAdminRouteProps> = ({ component: Component }) => {
    const { data, loading, error } = useQuery(ME);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;

    return data?.me?.admin ? <Component /> : <Navigate to="/" />;
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/addQuestion" element={<PrivateAdminRoute component={AddQuestion} />} />
            </Routes>
        </Router>
    );
};

export default App;
