import { createContext } from "react";
import IAuthContext from "../../types/IAuthContext";



export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  changeIsAuth: () => {},
});

export default AuthContext;