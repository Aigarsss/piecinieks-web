import React from 'react';
import NavBar from '@app/Components/NavBar';
import AdminDashboard from "@app/Components/AdminDashboard";
import {useLogin} from "@app/Hooks/useLogin";

const Dashboard = () => {
    // TODO, handle admin check here
    const { isAdmin } = useLogin();

    return (
        <div>
            <NavBar />
            {
                isAdmin ? <AdminDashboard /> : <div>Sadaļa pieejama tikai adminiem</div>
            }
        </div>
    );
};

export default Dashboard;
