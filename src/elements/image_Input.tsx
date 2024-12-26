import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { port } from "../config/env";

interface TypeImage {
  data: string;
  label: string;
  imageDefault?:string;
  setimagenew?:any;
}

export const Image_Input: React.FC<TypeImage> = ({ label, data,setimagenew }) => {

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
        if (setimagenew) {
          // Llama a setimagenew para actualizar la imagen en el padre
          setimagenew(urls[0]); 
        }
      })
      
      }
  }


  return (
        <div className=" mt-4 mb-2 ">
        
          <label
                      htmlFor={label}
                      className={`${errors[data] ? "border-red-500 bg-red-50" : "bg-gray-50 border-gray-300"} flex relative h-full flex-col items-center justify-center h-34 border-2  border-dashed rounded-lg cursor-pointer   hover:bg-gray-100 `}
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-center text-sm text-gray-500 ">
                          <span className={ ` ${errors[data] && "text-red-500"} italic font-semibold`}>Click to upload</span> or drag
                          and drop for <span className="text-base font-extrabold">{label}</span>
                        </p>
                      </div>
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
                            id={label}
                            type="file"
                            multiple={true}
                            //accept="image/*" // Aceptar solo imágenes
                            className="hidden"
                            onChange={(e) => { 
                              handleImage(e.target.files);
                              field.onChange(e.target.files)
                            }}
                          />
                        )}
                      />
                     
                      {errors[data] && <span className="text-red-500 absolute italic -bottom-7 l-0">{ errors[data].message }</span>} 
                    </label>
        </div>

  );
};
