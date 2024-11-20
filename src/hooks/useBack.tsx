import React, { useEffect, useState } from "react";
import { FormData } from "../interface/FormData";

interface UseBackProps<T> {
  url: string;
  data: T | any; // Cambia esto para aceptar datos de tipo genérico
}

const useBack = <T,>({ url, data }: UseBackProps<T>) => {
  const [formData, setFormData] = useState<FormData>(data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const base = "http://localhost:3221/";

  useEffect(() => {
    setFormData(data);
    validate();
  }, [data]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) {
      newErrors.name = "El nombre es obligatorio";
    }
    if (!formData.description) {
      newErrors.description = "La descripción es obligatoria";
    }
    if (!formData.category) {
      newErrors.category = "La categoría es obligatoria";
    }
    if ((formData.quantity as number) <= 0) {
      newErrors.quantity = "La cantidad debe ser mayor que cero";
    }
    if ((formData.price as number) < 0) {
      newErrors.price = "El precio no puede ser negativo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (validate()) {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      

      try {
        const response = await fetch(base + url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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
    }
  };

  return {
    formData,
    handleSubmit,
    isLoading,
    error,
    success,
  };
};

export default useBack;
