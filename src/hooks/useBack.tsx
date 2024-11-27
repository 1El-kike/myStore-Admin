import React, { useState } from "react";
import { FormData } from "../interface/FormData";
import {  SubmitHandler } from "react-hook-form";

interface UseBackProps<T> {
  url?: string;
}

const useBack = <T,>({ url }: UseBackProps<T>) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const base = "http://localhost:3450/";

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    
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
    console.log(transfData);

    try {
      const response = await fetch(base + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transfData),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const result = await response.json();
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
