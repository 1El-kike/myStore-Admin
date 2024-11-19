import React, { useEffect, useState } from 'react'
import { FormData } from '../interface/FormData';

interface UseBackProps<T> {
    url: string;
    data: T | any; // Cambia esto para aceptar datos de tipo genérico
  }


 const useBack  = <T,>({ url, data }: UseBackProps<T>) => {

    const [formData, setFormData] = useState<FormData>(data);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const base = 'http://localhost:5218/'

    useEffect(() => {
     setFormData(data)
    }, [data])
    

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
    
        try {
          const response = await fetch( base + url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
    
          const result = await response.json();
          console.log('Datos enviados exitosamente:', result);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
          setIsLoading(false);
        }
      };
    
      return {
        formData,
        handleSubmit,
        isLoading,
        error,
      };
}

export default useBack;
