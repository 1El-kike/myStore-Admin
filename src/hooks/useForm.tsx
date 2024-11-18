
import { useState } from 'react';

// Definimos la interfaz para los datos del formulario
interface FormData {
    name?: string;
    description?: string;
}

// Definimos la interfaz para el hook
const useForm = (initialValues: FormData, onFormDataChange: (data: FormData) => void) => {
    const [formData, setFormData] = useState<FormData>(initialValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        setFormData(updatedFormData);
        onFormDataChange(updatedFormData); // Enviar datos al padre
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
        // Aquí puedes agregar lógica adicional si es necesario
    };

    return {
        formData,
        handleChange,
        handleSubmit,
    };
};

export default useForm;