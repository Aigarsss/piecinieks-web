import React, { ReactComponentElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
// import AddQuestion from './Pages/AddQuestion';
import SignUp from './Pages/SignUp';
import './App.scss';
import SignIn from '@app/Pages/SignIn';
import Dashboard from '@app/Pages/Dashboard';
import { useLogin } from '@app/Hooks/useLogin';
import Loader from '@app/Components/Loader';

type PrivateAdminRouteProps = {
    component: () => ReactComponentElement<any>;
};

const PrivateRoute: React.FC<PrivateAdminRouteProps> = ({ component: Component }) => {
    const { isLoggedIn, isLoadingMe } = useLogin();
    const location = useLocation();

    if (isLoadingMe) return <Loader />;

    return isLoggedIn ? <Component /> : <Navigate to="/signIn" replace state={{ from: location }} />;
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/*Main page with questions*/}
                <Route path="/" element={<Home />} />
                {/*Accessed directly*/}
                <Route path="/signUp" element={<SignUp />} />
                {/*Accessed directly*/}
                <Route path="/signIn" element={<SignIn />} />
                {/*<Route path="/addQuestion" element={<PrivateAdminRoute component={AddQuestion} />} />*/}
                {/*Accessed directly, prompted for login*/}
                <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
                <Route path="*" element={<Navigate to="/" replace />}
                />
            </Routes>
        </Router>
    );
};

export default App;
