import * as React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


import store from './store';

import { AppRouter } from './routes/AppRouter';

import { ContextProvider } from './context/ContextProvider';


import CookieBanner from './components/CookieBanner/CookieBanner';
import Header from './components/Header/Header';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./App.css"
import "./nullstyle.css"



export default function App() {
    return (
        <Provider store={store}>
            <ContextProvider>
                <BrowserRouter>
                    <Header/>
                    <AppRouter/>
                    <CookieBanner/>
                </BrowserRouter>
            </ContextProvider>
        </Provider>
    );
}