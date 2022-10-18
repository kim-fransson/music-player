import { FunctionComponent } from 'react';
import './LoginButton.css';
import SpotifyIcon from '../../Icons/SpotifyIcon';

interface LoginButtonProps {
    authUrl: string;
}

const LoginButton: FunctionComponent<LoginButtonProps> = ({ authUrl }) => {
    return (
        <div className='loginButton'>
            <SpotifyIcon />
            <a href={authUrl}>Log in with Spotify</a>
        </div>
    );
};

export default LoginButton;
