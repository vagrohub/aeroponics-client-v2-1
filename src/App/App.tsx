import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from '../pages/Auth';
import Registration from '../pages/Registration';
import Dashboard from '../pages/Dashboard';
import WithDashboard from '../hoc/WithDashboard';
import AuthProvider from '../Provider/AuthProvider';
import { getWindowWidth } from '../utils/dom';
import WithRouterUtils from '../hoc/WithRouterUtils';
import DataProvider from '../Provider/DataProvider';
import WitchCheckAuth from '../hoc/WithCheckAuth';
import './app.scss';

const App = () => {
    const [windowWidth, setWindowWidth] = useState(getWindowWidth());
    const isMobile = windowWidth <= 858;

    const onResizeEvent = () => setWindowWidth(getWindowWidth());
    useEffect(() => {
        window.addEventListener('resize', onResizeEvent);

        return () => window.removeEventListener('resize', onResizeEvent);
    }, []);

    return (
        <AuthProvider>
            <DataProvider>
                <Routes>
                    <Route path='/' element={
                        <WitchCheckAuth>
                            <WithDashboard Component={Dashboard} isMobile={isMobile} />
                        </WitchCheckAuth>
                    } />
                    <Route path='/auth' element={
                        <WithRouterUtils Component={Auth} isMobile={isMobile} />
                    } />
                    <Route path='/registration' element={
                        <WithRouterUtils Component={Registration} isMobile={isMobile} />
                    } />
                </Routes>
            </DataProvider>
        </AuthProvider>
    );
};

export default App;
