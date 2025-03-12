import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
} from "react";
//import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import { AuthModel, UserModel } from "./_models";
import * as authHelper from "./AuthHelpers";
import { getUserByToken, refreshToken } from "./_requests";
import axios from "axios";
import Cookies from "js-cookie";

type AuthContextProps = {
  auth: AuthModel | undefined;
  saveAuth: (auth: AuthModel | undefined) => void;
  currentUser: UserModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
  logout: () => void;
};

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
//La función AuthInit es un componente funcional de React que
//se encarga de inicializar el estado de autenticación de un usuario antes de renderizar la aplicación.
const AuthInit: FC<PropsWithChildren> = ({ children }) => {
  const { auth, logout, setCurrentUser, saveAuth } = useAuth();
  const didRequest = useRef(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      try {
        if (!didRequest.current) {
          const { data } = await getUserByToken(apiToken);
          if (data) {
            setCurrentUser(data);
          }
          // refreshToken(auth?.api_token as string)
        }
      } catch (error) {
        // console.error(error)
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          try {
            // 1. Llama al endpoint de refreshToken
            const { data: newTokens }: any = await refreshToken();

            // 2. Actualiza el access token en el estado de autenticación
            const miCookie = Cookies.get("refreshtoken");
            const authModel = {
              api_token: newTokens.token,
              refreshToken: miCookie,
            };
            saveAuth(authModel);

            // 3. Vuelve a obtener los datos del usuario con el nuevo token
            const { data: userData } = await getUserByToken(newTokens.token);
            setCurrentUser(userData);
          } catch (refreshError) {
            // Si el refresh token también falla, cierra sesión
            console.error("Error :", refreshError);
            logout();
          }
        } else {
          // Otros errores (ej: red, servidor caído)
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    if (auth && auth.api_token) {
      requestUser(auth.api_token);
    } else {
      logout();
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, []);

  return showSplashScreen ? (
    /* <LayoutSplashScreen /> */ <div></div>
  ) : (
    <>{children}</>
  );
};

export { AuthProvider, AuthInit, useAuth };
