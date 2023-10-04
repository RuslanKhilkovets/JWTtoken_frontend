import { useContext, useState } from "react";
import AuthContext from "./AuthContext";

interface IAuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: IAuthContextProviderProps) => {
    const [isAuth, setIsAuth] = useState(true)
    const changeIsAuth = (): void => {
        setIsAuth(!isAuth)
    }

    return (
        <AuthContext.Provider value={{isAuth, changeIsAuth}}> 
            {children}
        </AuthContext.Provider>
    );
}
