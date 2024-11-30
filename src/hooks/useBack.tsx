import React, { useState } from "react";
import { FormData } from "../interface/FormData";
import {  FieldValues, SubmitHandler } from "react-hook-form";
import { useAuth } from "../utils/AuthContext";

interface UseBackProps<T> {
  url?: string;
}

const useBack = <T,>({ url }: UseBackProps<T>) => {

  const { user } = useAuth(); 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const base = "http://localhost:3450/";

  //Aser una funcion para hacer mejor la transformacion de datos numericos
  const transfoDatos = (value:any)=>{
      
  }

  const onSubmit:  SubmitHandler<FieldValues>= async (data) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    transfoDatos(data)


    const transfData = {
      ...data,
      cantidad:1,
      price:Number(data.price),
      quantity:Number(data.quantity),
      length:Number(data.length),
      items_weight:Number(data.items_weight),
      breadth:Number(data.breadth),
      website_admin:Number(data.website_admin),
      width:Number(data.width)
    }
    

    try {
      const response = await fetch(base + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${user?.token}`,
        },
        body: JSON.stringify(transfData),
      });

      const result = await response.text();
      
      console.log("Respuesta del servidor:", result);

      if (!response.ok) {
        throw new Error(result);
      }

      console.log("Datos enviados exitosamente:", result);
      setSuccess(true);
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
