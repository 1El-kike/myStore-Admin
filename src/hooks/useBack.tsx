import { useState } from "react";
import {  FieldValues, SubmitHandler } from "react-hook-form";
import { useAuth } from "../utils/AuthContext";
import { port } from "../config/env";
import { typeProduct } from "../interface/typeProducts";

interface UseBackProps<T> {
  url?: string;
  reset:()=> void;
}



const useBack = <T,>({ url, reset }: UseBackProps<T>) => {

  const { user } = useAuth(); 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [result, setresult] = useState<typeProduct | null>(null);

  const base = port;

  const onSubmit:  SubmitHandler<FieldValues>= async (data) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    console.log(data);

   const formData = new FormData();
  
   // Agregar todos los campos al FormData
   Object.keys(data).forEach((key) => {
    if (key === 'image' || key.includes("img")) {
        // Asegúrate de que data[key] sea un array y tenga al menos un archivo
        if (Array.isArray(data[key]) && data[key].length > 0) {
            formData.append(key, data[key][0]); // Solo agrega el primer archivo
        }
        
    } else {
      const valueToAppend = data[key] ;
      if(!valueToAppend){
        formData.append(key, ''); // Agrega otros campos normalmente
      }
      else{
        formData.append(key,valueToAppend)
      }
    }
});

    try {
      const response = await fetch(base + url, {
        method: "POST",
        headers: {
         "Authorization": `Bearer ${user?.token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setresult(result);
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
    result,
  };
};

export default useBack;
