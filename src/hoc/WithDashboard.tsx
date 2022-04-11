import { useState, useEffect } from 'react';
import Preloader from '../components/Preloader/Preloader';
import Error from '../pages/Error';
import UserService from '../serverServices/User';
import { User } from '../interface/User';
import ResponseError from '../elementaryEntities/ResponseError';
import useAuthContext from '../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';

interface WithDashboardProps {
    Component: any;
    isMobile: boolean;
}

const WithDashboard = ({ Component, isMobile }: WithDashboardProps) => {
    const [user, setUser] = useState<User | undefined>();
    const [error, setError] = useState<string | undefined>();
    const authContext = useAuthContext();

    useEffect(() => {
        const getUser = async () => {
            const userService = new UserService();
            const response = await userService.getFullData();

            if (response instanceof ResponseError) {
                setUser(undefined);
                setError(response.error);
            } else {
                setUser(response.user)
                setError(undefined);
            }
        };

        if (authContext.token) {
            getUser();
        }
    }, []);

    if (!authContext.token) {
        return (
            <Navigate to='/auth' />
        );
    }

    if (error) {
        return (
            <Error isMobile={isMobile}>
                {`Ошибка с сервера: ${error}`}
            </Error>
        );
    }

    if (!user) {
        return (
            <Preloader isMobile={isMobile}>
                Данные загружаются. Пожалйста подождите
            </Preloader>
        );
    }

    return (
        <Component user={user} isMobile={isMobile} />
    )
}

export default WithDashboard;