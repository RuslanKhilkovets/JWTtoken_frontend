import { createContext } from "react";

interface IAuthContext {
  isAuth: boolean;
  changeIsAuth: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  changeIsAuth: () => {},
});

export default AuthContext;