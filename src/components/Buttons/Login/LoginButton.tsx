import { FunctionComponent } from 'react';
import './LoginButton.css';
import SpotifyIcon from '../../Icons/SpotifyIcon';

interface LoginButtonProps {
    onClick: () => void;
}

const LoginButton: FunctionComponent<LoginButtonProps> = ({ onClick }) => {
    return (
        <div onClick={onClick} className='loginButton'>
            <SpotifyIcon />
            <p>Log in with Spotify</p>
        </div>
    );
};

export default LoginButton;
