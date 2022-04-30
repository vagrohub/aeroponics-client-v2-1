import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from '../pages/Auth';
import Registration from '../pages/Registration';
import Dashboard from '../pages/Dashboard';
import Reset from '../pages/Reset';
import WithDashboard from '../components/hoc/WithDashboard';
import AuthProvider from '../core/provider/AuthProvider';
import { getWindowWidth } from '../core/utils/dom';
import WithRouterUtils from '../components/hoc/WithRouterUtils';
import DataProvider from '../core/provider/DataProvider';
import WitchCheckAuth from '../components/hoc/WithCheckAuth';
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
                    <Route path='/reset' element={
                        <WithRouterUtils Component={Reset} isMobile={isMobile} />
                    } />
                </Routes>
            </DataProvider>
        </AuthProvider>
    );
};

export default App;
