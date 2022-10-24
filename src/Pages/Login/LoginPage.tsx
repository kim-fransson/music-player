import LoginButton from '../../components/Buttons/Login/LoginButton';
import './LoginPage.css';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';

export function LoginPage() {
    const accessToken = useAuth();
    if (accessToken) {
        console.log('-> /dashboard');
        return <Navigate to='/dashboard' />;
    }

    console.log('-> /login');
    return (
        <div className='loginPage'>
            <LoginButton />
        </div>
    );
}
