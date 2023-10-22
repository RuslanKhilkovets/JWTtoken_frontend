import * as React from 'react';
import ErrorPage from "../components/pages/Error/ErrorPage";
import HomePage from "../components/pages/Home/HomePage";
import LogInPage from "../components/pages/LogIn/LogInPage";
import MainPage from "../components/pages/MainPage/MainPage";
import RegistrationPage from "../components/pages/Registration/RegistrationPage";
import Tab1 from "../components/pages/AnalysesSelection/AnalysesSelection";
import Tab2 from "../components/pages/OrderPlacing/OrderPlacing";
import Tab3 from '../components/pages/DataConfirmation/DataConfirmation';
import PayloadPage from '../components/pages/PayloadPage/PayloadPage';

export interface IRoutes {
    path: string;
    component: React.FC;
    children?: IRoutes[];
}

export const publicRoutes: IRoutes[] = [
    { path: "/", component: HomePage },
    { path: "/login", component: LogInPage },
    { path: "/registration", component: RegistrationPage },
    { path: "*", component: ErrorPage }
];

export const privateRoutes: IRoutes[] = [
    { path: "/*",component: MainPage},
    { path: "/payload",component: PayloadPage},
    { path: "*", component: ErrorPage },
];

export const tabsRoutes: IRoutes[] = [
    { path: "/tab1", component: Tab1 },
    { path: "/tab2", component: Tab2 },
    { path: "/tab3", component: Tab3 },
    { path: "/",component: Tab1},
];