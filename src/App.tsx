import './App.css';
import { LoginPage, HomePage } from './components/Pages';

const code = new URLSearchParams(window.location.search).get('code');

export const App = () => {
    return code ? <HomePage code={code} /> : <LoginPage />;
};

export default App;
