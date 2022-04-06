import React, { ReactComponentElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
// import AddQuestion from './Pages/AddQuestion';
import SignUp from './Pages/SignUp';
import './App.css';
import SignIn from '@app/Pages/SignIn';
import Admin from '@app/Pages/Admin';
import { useLogin } from '@app/Hooks/useLogin';

type PrivateAdminRouteProps = {
    component: () => ReactComponentElement<any>;
};

const PrivateAdminRoute: React.FC<PrivateAdminRouteProps> = ({ component: Component }) => {
    const { isAdmin, loading, error } = useLogin();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;

    return isAdmin ? <Component /> : <Navigate to="/" />;
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/signIn" element={<SignIn />} />
                {/*<Route path="/addQuestion" element={<PrivateAdminRoute component={AddQuestion} />} />*/}
                <Route path="/admin" element={<PrivateAdminRoute component={Admin} />} />
            </Routes>
        </Router>
    );
};

export default App;
