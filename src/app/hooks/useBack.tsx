import { useEffect, useState } from "react";
import {  FieldValues, SubmitHandler } from "react-hook-form";
import { typeProduct } from "../../interface/typeProducts";
import { port } from "../../config/env";
import { useAuth } from "../module/auth/core/Auth";
import axios from "axios";

interface UseBackProps<T> {
  url?: string;
  reset:()=> void;
  method?:string;
  initialData?: any; 
}



const useBack = <T,>({ url, reset,method ="POST",initialData }: UseBackProps<T>) => {

  const { auth } = useAuth(); 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [result, setresult] = useState<typeProduct | null>(null);


  

  const base = port;
  

  const onSubmit:  SubmitHandler<FieldValues>= async (data) => {
    console.log(data)
    setIsLoading(true);
    setError(null);
    setSuccess(false);

     // Verificar si los datos son iguales a los valores iniciales
  if (method === "PUT" && initialData) {
    const hasChanges = Object.keys(data).some((key) => data[key] !== initialData[key]);
    if (!hasChanges) {
      setError(`No se ha cambiado nada`);
      setIsLoading(false);
      return; // Salir de la función si no hay cambios
    }
  }

   const formData = new FormData();

    // Agregar items como JSON
  if (data.items) {
    formData.append('items', JSON.stringify(data.items));
  }
  if (data.timeOrder){
    formData.append("timeOrder",JSON.stringify(data.timeOrder))
  }
  
// Agregar solo los campos que han cambiado
Object.keys(data).forEach((key) => {
  if (key === 'items') return;
  
  if (key === 'timeOrder') return;

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

      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]); 
      }

      /* const response = await fetch(base + url, {
        method: method,
        headers: {
         "Authorization": `Bearer ${auth?.api_token}`,
        },
        body: formData,
      }); */

      const response = await axios.request({
        method: method,
        url: base + url,
         headers: {
          "Authorization": `Bearer ${auth?.api_token}`,
       //   "Content-Type": "multipart/form-data", // Axios detecta FormData, pero puedes explicitarlo
        }, 
        data: formData,
      });

      const result = await response.data;

      if (!response) {
        throw new Error(result.message);
      }

      setresult(result);
      setSuccess(true);
      reset();
    } catch (error:any) {
      setError( error.response.data.message || "Error desconocido");
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
