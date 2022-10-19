import { FunctionComponent } from 'react';
import useAuth from '../../../hooks/use-auth';

interface HomePageProps {
    code: string;
}

export const HomePage: FunctionComponent<HomePageProps> = ({ code }) => {
    useAuth(code);

    return <div>Home</div>;
};
