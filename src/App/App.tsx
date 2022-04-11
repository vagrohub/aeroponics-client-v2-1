import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from '../pages/Auth';
import Registration from '../pages/Registration';
import Dashboard from '../pages/Dashboard';
import WithDashboard from '../hoc/WithDashboard';
import AuthProvider from '../Provider/AuthProvider';
import { getWindowWidth } from '../utils/dom';
import WithRouterUtils from '../hoc/WithRouterUtils';
import './app.scss';

import User from '../serverServices/User';
import Device from '../serverServices/Device';
import { user } from './data';

const serviceTest = async () => {
    // -- работа с пользователем --
    const userService = new User();
    const userInfo = await userService.getFullData();
    console.log(userInfo);
    // -- end --

    // -- работа с устройствами --
    const deviceService = new Device();
    const response = await deviceService
        .createNew('TestingDevice43-43-43-43', '123456', 'Description');
    console.log(response);
    // -- end --
}

const App = () => {
    const [windowWidth, setWindowWidth] = useState(getWindowWidth());
    const isMobile = windowWidth <= 858;

    const onResizeEvent = () => setWindowWidth(getWindowWidth());
    useEffect(() => {
        window.addEventListener('resize', onResizeEvent);

        // serviceTest();

        return () => window.removeEventListener('resize', onResizeEvent);
    }, []);

    return (
        <AuthProvider>
            <Routes>
                {/* <Route path='/' element={
                    <WithDashboard Component={Dashboard} isMobile={isMobile} />
                } /> */}
                <Route path='/' element={
                    <Dashboard isMobile={isMobile} user={user} />
                } />
                <Route path='/auth' element={
                    <WithRouterUtils Component={Auth} isMobile={isMobile} />
                } />
                <Route path='/registration' element={
                    <WithRouterUtils Component={Registration} isMobile={isMobile} />
                } />
            </Routes>
        </AuthProvider>
    );
};

export default App;
