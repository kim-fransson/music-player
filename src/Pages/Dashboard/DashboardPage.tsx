import { FunctionComponent, useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import './DashboardPage.css';
import { useAuth } from '../../hooks/use-auth';
import { User } from '../../interfaces/spotify/user';
import { UserProfileCard } from '../../components/Cards/UserProfileCard';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
});

export const DashboardPage: FunctionComponent = () => {
    const accessToken = useAuth();
    const [user, setUser] = useState<User>(null);

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        const fetchMeAndTopArtistsAndTopSongs = async () => {
            if (!accessToken) {
                return;
            }

            try {
                const [meRes, topTracksRes, topArtistRes] = await Promise.all([
                    spotifyApi.getMe(),
                    spotifyApi.getMyTopTracks(),
                    spotifyApi.getMyTopArtists(),
                ]);

                const top5Tracks = topTracksRes.body.items.slice(0, 5);
                const top5Artists = topArtistRes.body.items.slice(0, 5);

                setUser({
                    displayName: meRes.body.display_name,
                    imageUrl: meRes.body.images[0].url,
                    topTracks: top5Tracks.map((track) => {
                        return {
                            id: track.id,
                            name: track.name,
                        };
                    }),
                    topArtists: top5Artists.map((artist) => {
                        return {
                            id: artist.id,
                            name: artist.name,
                        };
                    }),
                });
            } catch (err) {
                console.log(err);
            }
        };

        fetchMeAndTopArtistsAndTopSongs();
    }, [accessToken]);

    console.log(user);

    return (
        <div className='dashboard'>
            <div className='dashboard__profileCard'>
                {user && <UserProfileCard user={user} />}
            </div>
        </div>
    );
};
