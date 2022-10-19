import { FunctionComponent } from 'react';
import './LoginButton.css';
import SpotifyIcon from '../../Icons/SpotifyIcon';
import { authClient } from '../../../clients/auth-client';

interface LoginResponse {
    authUrl: string;
}

const LoginButton: FunctionComponent = () => {
    const redirectToSpotifyLoginPage = async () => {
        const res = await authClient.get<LoginResponse>('/login');
        window.location.href = res.data.authUrl;
    };

    return (
        <div onClick={redirectToSpotifyLoginPage} className='loginButton'>
            <SpotifyIcon />
            <p>Log in with Spotify</p>
        </div>
    );
};

export default LoginButton;
