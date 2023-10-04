import { useContext, useState } from "react";
import AuthContext from "./AuthContext/AuthContext";
import { AuthContextProvider } from "./AuthContext/AuthContextProvider";
import LoaderContext from "./LoaderContext/LoaderContext";
import LoaderContextProvider from "./LoaderContext/LoaderContextProvider";

interface IContextProvider {
  children: React.ReactNode;
}

export const ContextProvider = ({ children }: IContextProvider) => {

    return (
        <AuthContextProvider>
            <LoaderContextProvider>
                {children}
            </LoaderContextProvider>
        </AuthContextProvider>
    );
}
