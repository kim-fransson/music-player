import LoginButton from '../../components/Buttons/Login/LoginButton';
import './LoginPage.css';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { authClient } from '../../clients/auth-client';

interface LoginResponse {
    authUrl: string;
}

export function LoginPage() {
    const accessToken = useAuth();
    if (accessToken) {
        return <Navigate to='/dashboard' />;
    }

    const redirectToSpotifyLoginPage = async () => {
        const res = await authClient.get<LoginResponse>('/login');
        window.location.href = res.data.authUrl;
    };

    return (
        <div className='loginPage'>
            <LoginButton onClick={redirectToSpotifyLoginPage} />
        </div>
    );
}
