import { useEffect } from 'react';
import { FunctionComponent, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { authClient } from '../../clients/auth-client';
import { AuthContext } from '../../context/auth-context';
import { useLocalStorage } from '../../hooks/use-local-storage';

interface AuthorizeResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

interface RefreshTokenResponse {
    accessToken: string;
    expiresIn: number;
}

interface AuthProviderProps {
    code: string;
    children: ReactNode;
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
    code,
    children,
}) => {
    const [accessToken, setAccessToken] =
        useLocalStorage<string>('accessToken');
    const [refreshToken, setRefreshToken] =
        useLocalStorage<string>('refreshToken');
    const [expiresIn, setExpiresIn] = useLocalStorage<number>('expiresIn');
    const navigate = useNavigate();

    useEffect(() => {
        if (!code) {
            return;
        }

        const authorize = async () => {
            console.info('authorizing user');
            try {
                const response = await authClient.post<AuthorizeResponse>(
                    '/authorize',
                    { code }
                );

                window.history.pushState({}, null, '/'); // removes code from url

                const { accessToken, refreshToken, expiresIn } = response.data;
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                setExpiresIn(expiresIn);
            } catch (error) {
                console.log(error.message);
                navigate('/login');
            }
        };

        authorize();
    }, [code]);

    useEffect(() => {
        if (!refreshToken || !expiresIn) {
            return;
        }

        const refresh = async () => {
            try {
                console.info('refreshing token');
                const response = await authClient.post<RefreshTokenResponse>(
                    '/refresh_token',
                    { refreshToken }
                );

                const { accessToken, expiresIn } = response.data;
                setAccessToken(accessToken);
                setExpiresIn(expiresIn);
            } catch (error) {
                console.log(error.message);
                navigate('/login'); // todo: alert after re-direct
            }
        };

        const interval = setInterval(() => {
            refresh();
        }, (expiresIn - 60) * 1000);

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    return (
        <AuthContext.Provider value={accessToken}>
            {children}
        </AuthContext.Provider>
    );
};
