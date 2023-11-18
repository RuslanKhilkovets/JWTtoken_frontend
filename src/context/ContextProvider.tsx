import { AuthContextProvider } from "./AuthContext/AuthContextProvider";
import LoaderContextProvider from "./LoaderContext/LoaderContextProvider";
import ShoppingCartItemsCountContextProvider from "./ShoppingCartItemsContext/ShoppingCartItemsContextProvider";

import IContextProvider from "../types/IContextProvider";


export const ContextProvider = ({ children }: IContextProvider) => {

    return (
        <AuthContextProvider>
            <LoaderContextProvider>
                <ShoppingCartItemsCountContextProvider>
                    {children}
                </ShoppingCartItemsCountContextProvider>
            </LoaderContextProvider>
        </AuthContextProvider>
    );
}
