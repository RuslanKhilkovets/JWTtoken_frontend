import * as React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./App.css"
import LoginPage from './components/pages/LogIn/LogInPage';
import HomePage from './components/pages/Home/HomePage';
import { AppRouter } from './components/AppRouter';
import { routes } from './routes/routes';


export default function App() {

    return (
        <AppRouter routes={routes}/>
    );
}