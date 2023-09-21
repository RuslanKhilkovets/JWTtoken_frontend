import HomePage from "../components/pages/Home/HomePage";
import LogInPage from "../components/pages/LogIn/LogInPage";
import RegistrationPage from "../components/pages/Registration/RegistrationPage";

export interface IRoutes{
    path: string;
    component: React.FC
}

export const routes: IRoutes[] = [
    {path: "/", component: HomePage},
    {path: "/login", component: LogInPage},
    {path: "/registration", component: RegistrationPage},
]


