import { useState } from "react";
import {  FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import { useAuth } from "../utils/AuthContext";

interface UseBackProps<T> {
  url?: string;
  reset:()=> void;
}

const useBack = <T,>({ url, reset }: UseBackProps<T>) => {

  const { user } = useAuth(); 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const base = "http://localhost:3450/";

  const onSubmit:  SubmitHandler<FieldValues>= async (data) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

  
   const formData = new FormData();
  
  // Agregar todos los campos al FormData
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });

  // Asegúrate de agregar cada archivo al FormData
  for (let i = 0; i < data.image.length; i++) {
    formData.append('image', data.image[i]);
}

    try {
      const response = await fetch(base + url, {
        method: "POST",
        headers: {
         "Authorization": `Bearer ${user?.token}`,
        },
        body: formData,
      });

      const result = await response.json();

      console.log(formData);

      if (!response.ok) {
        throw new Error(result.message);
      }

      console.log("Datos enviados exitosamente:", result);
      setSuccess(true);
      reset();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
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

export default useBack;
