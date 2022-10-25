import { FunctionComponent } from 'react';
import { User } from '../../interfaces/spotify/user';
import './UserProfileCard.css';

export interface UserProfileCardProps {
    user: User;
}

export const UserProfileCard: FunctionComponent<UserProfileCardProps> = ({
    user,
}) => {
    return (
        <div className='profileCard'>
            <img
                className='profileCard__profileImage'
                src={user.imageUrl}
                alt='spotify profile image'
            />

            <div className='profileCard__topLists'>
                <div className='topLists__artists'>
                    <p className='artists__title'>Top Artists</p>
                    <ul className='artists__list'>
                        {user.topArtists.map((artist) => (
                            <li className='artist' key={artist.id}>
                                {artist.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='topLists__tracks'>
                    <p className='tracks__title'>Top Songs</p>
                    <ul className='tracks__list'>
                        {user.topTracks.map((track) => (
                            <li className='track' key={track.id}>
                                {track.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
