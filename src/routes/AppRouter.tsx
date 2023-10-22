import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes"
import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";




export const AppRouter: React.FC = () => {
    const { isAuth } = useContext(AuthContext);
    
    return (
        <Routes>
            {
                isAuth
                ?
                privateRoutes.map(route => (
                    <Route key={route.path} path={route.path} element={<route.component />} />
                ))
                :
                publicRoutes.map(route => (
                    <Route key={route.path} path={route.path} element={<route.component />} />
                ))
            }
        </Routes>
    );
};

export default AppRouter;