import { useEffect, useState } from 'react';
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
    children: ReactNode;
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
    children,
}) => {
    const urlParams = new URLSearchParams(window.location.search);

    console.log(
        `AuthProvider: \n\t accessToken: ${urlParams.get(
            'accessToken'
        )} \n\t refreshToken: ${urlParams.get(
            'refreshToken'
        )} \n\t expiresIn: ${urlParams.get('expiresIn')}`
    );

    const [accessToken, setAccessToken] =
        useLocalStorage<string>('accessToken');
    const [refreshToken, setRefreshToken] =
        useLocalStorage<string>('refreshToken');
    const [expiresIn, setExpiresIn] = useLocalStorage<number>('expiresIn');

    useEffect(() => {
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');
        const expiresIn = Number.parseInt(urlParams.get('expiresIn'));

        if (accessToken) {
            setAccessToken(accessToken);
        }

        if (refreshToken) {
            setRefreshToken(refreshToken);
        }

        if (expiresIn) {
            setExpiresIn(expiresIn);
        }
    }, [urlParams]);

    const navigate = useNavigate();

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
