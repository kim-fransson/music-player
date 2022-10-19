import { useEffect } from 'react';
import { authClient } from '../clients/auth-client';
import { useLocalStorage } from './use-local-storage';

interface AuthorizeResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

interface RefreshTokenResponse {
    accessToken: string;
    expiresIn: number;
}

export default function useAuth(code: string) {
    const [accessToken, setAccessToken] =
        useLocalStorage<string>('accessToken');
    const [refreshToken, setRefreshToken] =
        useLocalStorage<string>('refreshToken');
    const [expiresIn, setExpiresIn] = useLocalStorage<number>('expiresIn');

    useEffect(() => {
        const authorize = async () => {
            try {
                const response = await authClient.post<AuthorizeResponse>(
                    '/authorize',
                    { code }
                );

                window.history.pushState({}, null, '/');

                const { accessToken, refreshToken, expiresIn } = response.data;
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                setExpiresIn(expiresIn);
            } catch (error) {
                // todo: redirect to Login page + (error message)
                console.log(error.message);
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
                const response = await authClient.post<RefreshTokenResponse>(
                    '/refresh_token',
                    { refreshToken }
                );

                const { accessToken, expiresIn } = response.data;
                setAccessToken(accessToken);
                setExpiresIn(expiresIn);
            } catch (error) {
                // todo: redirect to Login page + (error message)
                console.log(error.message);
            }
        };

        const interval = setInterval(() => {
            refresh();
        }, (expiresIn - 60) * 1000);

        return () => clearInterval(interval);
    }, [refreshToken, expiresIn]);

    return accessToken;
}
