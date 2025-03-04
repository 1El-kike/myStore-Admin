import axios, { AxiosInstance } from "axios";
import { AuthModel } from "./_models";
import { port } from "../../../../config/env";

const AUTH_LOCAL_STORAGE_KEY = "kt-auth-react-v";

const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return;
  }
  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!lsValue) {
    return;
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel;
    if (auth) {
      // You can easily check auth_token expiration also
      return auth;
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE PARSE ERROR", error);
  }
};

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return;
  }

  try {
    const lsValue = JSON.stringify(auth);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error("AUTH LOCAL STORAGE REMOVE ERROR", error);
  }
};

const axiosI :AxiosInstance = axios.create({
  baseURL:port, 
  withCredentials:true,
})

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = "application/json";
  axios.defaults.withCredentials = true;
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string  } } ) => {
      const auth = getAuth();
      if (auth && auth.api_token) {
        config.headers.Authorization = `Bearer ${auth.api_token}`;
      }
      //La configuración modificada se retorna, lo que permite que la solicitud continúe con los nuevos encabezados.
      return config;
    },
    (err: any) => Promise.reject(err)
  );
}

export { getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY };
