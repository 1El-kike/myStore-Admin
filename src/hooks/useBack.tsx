import { useEffect, useState } from "react";
import {  FieldValues, SubmitHandler } from "react-hook-form";
import { useAuth } from "../utils/AuthContext";
import { port } from "../config/env";
import { typeProduct } from "../interface/typeProducts";

interface UseBackProps<T> {
  url?: string;
  reset:()=> void;
  method?:string;
  initialData?: any; 
}



const useBack = <T,>({ url, reset,method ="POST",initialData }: UseBackProps<T>) => {

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

     // Verificar si los datos son iguales a los valores iniciales
  if (method === "PUT" && initialData) {
    const hasChanges = Object.keys(data).some((key) => data[key] !== initialData[key]);

    if (!hasChanges) {
      setError("No se ha cambiado nada.");
      setIsLoading(false);
      return; // Salir de la función si no hay cambios
    }
  }

   const formData = new FormData();
  
// Agregar solo los campos que han cambiado
Object.keys(data).forEach((key) => {
  if (method === "PUT" && initialData) {

    // Solo agregar campos que han cambiado
    if (data[key] !== initialData[key]) {
     
      if (key === 'image' || key.includes("img")) {
        if (Array.isArray(data[key]) && data[key].length > 0) {
          formData.append(key, data[key][0]); // Solo agrega el primer archivo
        }
      } else {
        formData.append(key, data[key] !== undefined ? data[key] : ''); // Agrega otros campos normalmente
      }
    }
  } else {
    // Para POST o si no hay comparación necesaria
    if (key === 'image' || key.includes("img")) {
      if (Array.isArray(data[key]) && data[key].length > 0) {
        formData.append(key, data[key][0]); // Solo agrega el primer archivo
      }
    } else {
      formData.append(key, data[key] !== undefined ? data[key] : ''); // Agrega otros campos normalmente
    }
  }
});

if (method == "PUT") {
  formData.append("id",data.id);
}

    try {
      const response = await fetch(base + url, {
        method: method,
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
