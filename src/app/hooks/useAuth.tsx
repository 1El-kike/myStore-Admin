import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useBack } from "../../interface/UserType";
import { port } from "../../config/env";
import { getUserByToken, login, register } from "../module/auth/core/_requests";
import { useAuth } from "../module/auth/core/Auth";

interface useAuthProps<T> {
  url?: string;
}

const useAuths = <T,>({ url }: useAuthProps<T>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const base = port;

  //Aser una funcion para hacer mejor la transformacion de datos numericos
  const transfoDatos = (value: any) => {};
  const {saveAuth, setCurrentUser} = useAuth()
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    transfoDatos(data);

    try {
      const auth = await register(data)
      console.log(auth)
      saveAuth(auth?.data?.userclient)
     // const {data: user} = await getUserByToken(auth.data)
      setCurrentUser(data)

      setSuccess(true); 
    } catch (error) {
      console.error(error)
      saveAuth(undefined)
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

 /*  useEffect(() => {
    login(user?.userclient[0], user?.token);
  }, [user]); */

  return {
    onSubmit,
    isLoading,
    error,
    success,
  };
};

export default useAuths;
