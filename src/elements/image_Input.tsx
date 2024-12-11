import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface TypeImage {
  data: string;
  label: string;
}

export const Image_Input: React.FC<TypeImage> = ({ label, data }) => {

  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const { control,formState: { errors,isSubmitSuccessful } ,setValue} = useFormContext();


  useEffect(() => {
   if (isSubmitSuccessful) {
    setImagePreview([])
   }

  }, [isSubmitSuccessful]) 
  

  const handleImage =(files:FileList | null )=>{
    if (files) {
      const newimage = Array.from(files).map(file =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((res)=>{
          reader.onloadend = () => res(reader.result as string)
        });
      });

      Promise.all(newimage).then((urls)=>{
        if(!errors[data]){
          setImagePreview((prev:any) =>[...prev.slice(-2),...urls]);
          setValue(data, Array.from(files));
        }
      })
    }
  }


  return (
        <div className="flex mt-4 mb-2 flex-grow flex-col">
          <label
            htmlFor={data}
            className="block mb-2  text-base font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>

          <Controller
              name={data} // Nombre del campo en el formulario
              control={control}
              rules={{
                required:"This field is required",
                validate: {
                  fileType: (value) => {
                    if (!value || value.length === 0) return "La imagen es requerida";
                    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
                    return Array.from(value).every((file:any ) => validTypes.includes(file.type)) || "Tipo de archivo no válido";
                  },
                  fileSize: (value) => {
                    if (!value || value.length === 0) return "La imagen es requerida";
                    return Array.from(value).every((file:any) => file.size <= 2000000) || "File size must be less than 2MB"; // Limitar a 2MB
                  }
                }
              }}
              render={({ field }) => (
                <input
                  id={data}
                  type="file"
                  multiple={true}
                  //accept="image/*" // Aceptar solo imágenes
                  className={`bg-gray-50 mb-2 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  ${
                    errors?.[data]
                      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full"
                      : "text-gray-900"
                  }`}
                  onChange={(e) => { 
                    handleImage(e.target.files);
                    field.onChange(e.target.files)
                  }}
                />
              )}
            />
        </div>

  );
};
