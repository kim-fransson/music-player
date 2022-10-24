import LoginButton from '../../components/Buttons/Login/LoginButton';
import './LoginPage.css';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

export function LoginPage() {
    const accessToken = useAuth();
    if (accessToken) {
        return <Navigate to='/dashboard' />;
    }

    return (
        <div className='loginPage'>
            <LoginButton />
        </div>
    );
}
