import React, { ReactComponentElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
// import AddQuestion from './Pages/AddQuestion';
import SignUp from './Pages/SignUp';
import './App.css';
import SignIn from '@app/Pages/SignIn';
import Admin from '@app/Pages/Admin';
import { useLogin } from '@app/Hooks/useLogin';
import Loader from '@app/Components/Loader';

type PrivateAdminRouteProps = {
    component: () => ReactComponentElement<any>;
};

const PrivateAdminRoute: React.FC<PrivateAdminRouteProps> = ({ component: Component }) => {
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
                <Route path="/admin" element={<PrivateAdminRoute component={Admin} />} />
            </Routes>
        </Router>
    );
};

export default App;
