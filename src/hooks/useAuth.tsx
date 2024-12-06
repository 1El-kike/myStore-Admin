import React, { useEffect, useState } from "react";
import { FormData } from "../interface/FormDataProduct";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAuth } from "../utils/AuthContext";
import { useBack } from "../interface/UserType";

interface useAuthProps<T> {
  url?: string;
}

const useAuths = <T,>({ url }: useAuthProps<T>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [user, setuser] = useState<useBack>({
    userclient: {
      0:{name: "",
      iphone: "",}
    },
    token: "",
  });

  const base = "http://localhost:3450/";

  //Aser una funcion para hacer mejor la transformacion de datos numericos
  const transfoDatos = (value: any) => {};
  const { login } = useAuth();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    transfoDatos(data);

    try {
      const response = await fetch(base + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }
      setuser(result);
      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    login(user?.userclient[0], user?.token);
  }, [user]);

  return {
    onSubmit,
    isLoading,
    error,
    success,
    user,
  };
};

export default useAuths;
