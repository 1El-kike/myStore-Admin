import { useState } from "react";
import { FormData } from "../interface/FormData";

// Definimos la interfaz para los datos del formulario


// Definimos la interfaz para el hook
const useForm = (
  initialValues: FormData,
  onFormDataChange: (data: FormData) => void
) => {
  const [formData, setFormData] = useState<FormData>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement 
    >
  ) => {
    const { name, value } = e.target;

 // Verificar si el valor es numérico
 let updatedValue: any = value; // Inicializar con el valor original

 // Intentar convertir a número si es un campo numérico
 if (name === 'quantity' || name === 'price' || name === 'items_weight') { // Cambia 'quantity' y 'sku' por los nombres reales de tus campos numéricos
     updatedValue = value ? parseFloat(value) : 0; // Usa parseInt si solo necesitas enteros
 }

    const updatedFormData = { ...formData, [name]: updatedValue  };
    setFormData(updatedFormData);
    onFormDataChange(updatedFormData); // Enviar datos al padre
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes agregar lógica adicional si es necesario
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
