import { useEffect, useState } from "react"
import { FormData } from "../interface/FormData";
  

const useValidation = ({data}:any) => {
    
   // const [formData, setFormData] = useState<FormData>(data);
  
    const [validation, setValidation] = useState<{ [key: string]: string }>();


  const handleValidate = ( dataToValidate: FormData ) => {
    const newErrors: { [key: string]: string } = {};
    if (!dataToValidate?.name && dataToValidate != undefined) {
      newErrors.name = "El nombre es obligatorio";
    }
    if (!dataToValidate?.description && dataToValidate != undefined ) {
      newErrors.description = "La descripción es obligatoria";
    }
    if (!dataToValidate?.category && dataToValidate != undefined ) {
      newErrors.category = "La categoría es obligatoria";
    }
    if ((dataToValidate?.quantity as number ) <= 0 && dataToValidate != undefined) {
      newErrors.quantity = "La cantidad debe ser mayor que cero";
    }
    if ((dataToValidate?.price as number) < 0 && dataToValidate != undefined) {
      newErrors.price = "El precio no puede ser negativo";
    }

    setValidation(newErrors);
    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
  };


  useEffect(() => {
    // setFormData(data);
     handleValidate(data);
 console.log(data)
   }, [data]);

    return {
        validation,
       handleValidate
    }
}

export default useValidation;