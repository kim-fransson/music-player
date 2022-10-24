import { FunctionComponent } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

export const ProtectedLayout: FunctionComponent = () => {
    const accessToken = useAuth();
    if (!accessToken) {
        return <Navigate to='/login' />;
    }
    return <Outlet />;
};
