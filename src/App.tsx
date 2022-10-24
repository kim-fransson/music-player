import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { ProtectedLayout } from './components/layouts/ProtectedLayout';
import { AuthProvider } from './components/providers/AuthProvider';
import { DashboardPage, LoginPage } from './Pages';

const code = new URLSearchParams(window.location.search).get('code');

export const App = () => {
    return (
        <AuthProvider code={code}>
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/login' element={<LoginPage />} />

                <Route element={<ProtectedLayout />}>
                    <Route path='/dashboard' element={<DashboardPage />} />
                </Route>
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </AuthProvider>
    );
};

export default App;
