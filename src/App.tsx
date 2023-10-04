import * as React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./App.css"
import "./nullstyle.css"
import { AppRouter } from './components/AppRouter';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './context/ContextProvider';


export default function App() {
    return (
        <Provider store={store}>
            <ContextProvider>
                <BrowserRouter>
                    <Header/>
                    <AppRouter/>
                </BrowserRouter>
            </ContextProvider>
        </Provider>
    );
}