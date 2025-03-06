import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { getUserByToken, login, register } from "../module/auth/core/_requests";
import { useAuth } from "../module/auth/core/Auth";
import { UserModel } from "../module/auth/core/_models";
import axios, { AxiosError } from "axios";

interface TypeuseAuth {
  methods:'login' | "register"
}

const useAuths  = ({methods}:TypeuseAuth ) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  
  
  const {saveAuth, setCurrentUser} = useAuth()
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    let auth: any | [] = [] 
    try {
      if (methods == "login") {
         auth = await login(data)
        saveAuth(auth?.data)
      }else if(methods == "register"){
         auth = await register(data)
        saveAuth(auth?.data)
      }

      const {data: user} = await getUserByToken(auth?.data?.api_token)
      setCurrentUser(user)

      setSuccess(true); 
    } catch (error) {
      // Verificar si es un error de Axios
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    // Acceder a la respuesta del servidor (si existe)
    if (axiosError.response) {
      const { status, data }:any = axiosError.response;
      
      // Mostrar mensaje del backend
      console.error(data)
      setError(`Error ${status}: ${data.error}`);
      
      // Si el backend envía un mensaje estructurado (ej: { message: "Error" })
      if (typeof data === 'object' && data !== null && 'message' in data) {
        console.error('Mensaje del servidor:', data.message);
        setError( `${data.message}`)
      }
    } else {
      console.error('Error de red o sin respuesta:', axiosError.message);
      setError(`${axiosError.message}`)
    }
  } else {
    // Error no relacionado con Axios
    console.error('Error inesperado:', error);
    setError(`${error}`)
  }
      saveAuth(undefined)
      //setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onSubmit,
    isLoading,
    error,
    success,
  };
};

export default useAuths;
