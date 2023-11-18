import { Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes"
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { addItemsToShoppingCart } from "../store/shoppingCart/actions";
import { getItemFromStorage } from "../utils/localStorageItems";




export const AppRouter: React.FC = () => {
    const { isAuth } = useContext(AuthContext);
    useEffect(() => {
        addItemsToShoppingCart(getItemFromStorage("ShoppingCart"))
    });

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