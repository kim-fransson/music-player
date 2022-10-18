import { ImSpotify } from 'react-icons/im';
import { IconContext } from 'react-icons';

function SpotifyIcon() {
    return (
        <IconContext.Provider value={{ size: '40px', color: 'white' }}>
            <div>
                <ImSpotify />
            </div>
        </IconContext.Provider>
    );
}

export default SpotifyIcon;
