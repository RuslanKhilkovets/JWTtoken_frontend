import * as React from 'react';




import ErrorPage from '../pages/Error/ErrorPage';
import HomePage from "../pages/Home/HomePage";
import LogInPage from "../pages/LogIn/LogInPage";
import MainPage from "../pages/MainPage/MainPage";
import RegistrationPage from "../pages/Registration/RegistrationPage";
import PayloadPage from '../pages/PayloadPage/PayloadPage';


import AnalysesSelection from '../pages/tabs/AnalysesSelection/AnalysesSelection';
import OrderPlacing from '../pages/tabs/OrderPlacing/OrderPlacing';
import DataConfirmation from '../pages/tabs/DataConfirmation/DataConfirmation';

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
    { path: "/tab1", component: AnalysesSelection },
    { path: "/tab2", component: OrderPlacing },
    { path: "/tab3", component: DataConfirmation },
    { path: "/",component: AnalysesSelection},
    { path: "*", component: ErrorPage },
];