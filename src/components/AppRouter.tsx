import { BrowserRouter, Routes, Route } from "react-router-dom";
import {IRoutes} from "../routes/routes"
import { useContext } from "react";
import { routes } from "../routes/routes";

export const AppRouter: React.FC<{ routes: IRoutes[] }> = ({routes}) => {
    return (
        <BrowserRouter>
            <Routes>
                {
                    routes.map(route => <Route key={route.path} path={route.path} element={ <route.component/> }/>)
                }
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;