import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Image_Input } from "./image_Input";
import { Avatar } from "@nextui-org/react";
import { port } from "../../../config/env";

interface TypeImage {
  imagenDefaultfondo?: string | null;
  imagenDefaultportada?: string | null;
}

export const LogoAndApariencia:React.FC<TypeImage> = ({imagenDefaultfondo,imagenDefaultportada}) => {
  const { watch } = useFormContext();
  const [imageDefault, setimageDefault] = useState({
    fondo:'',
    portada:''
  })

  useEffect(() => {
    
    if (imagenDefaultfondo && imagenDefaultportada) {
      setimageDefault({
        fondo:port + imagenDefaultfondo,
        portada:port + imagenDefaultportada})
    }
  
  }, [imagenDefaultfondo,imagenDefaultportada])

useEffect(() => {
      const subscription = watch((value) => {
        if (!value.imgfondo) {
          setimageDefault({portada:'',fondo:''}); // Restablece a null si no hay tipo de venta seleccionado
        }
      });
  
      return () => subscription.unsubscribe();
    }, [watch]);
  

  return (
    <>
      <h1 className="text-2xl my-5  font-bold">Logo and Apariencia </h1>
      <div className="shadow-xl flex  shadow-slate-200 border  md:flex-col  border-gray-300 rounded-2xl">
        <div className="flex relative justify-center mx-3 mt-4">
          <div className="w-full overflow-hidden blur-sm h-32">
            <img
              src={imageDefault?.fondo}
              className="aspect-video w-full bg-gradient-to-tr from-white via-gray-200 to-slate-200 "
              alt=""
            />
          </div>
          <div className=" w-full absolute h-10 bg-gradient-to-tr blur-md from-rose-800 to-transparent -bottom-4"></div>
          <Avatar
            isBordered
            className="w-32 bg-gradient-to-tr from-white via-rose-200 to-purple-200 h-32 absolute rounded-full top-3 shadow-xl shadow-rose-900 left-0"
            src={imageDefault?.portada}
          />
        </div>
        <div className="flex mb-7 mt-2 px-3 gap-4">
          <Image_Input
            data="imgPortada"
            label="Imagen de Logo"
            setimagenew={(newImage:string) => setimageDefault(prev => ({ ...prev, portada: newImage }))} // Actualiza solo la portada
           
          />
          <Image_Input
           setimagenew={(newImage:string) => setimageDefault(prev => ({ ...prev, fondo: newImage }))} // Actualiza solo la portada
            data="imgfondo"
            label="Imagen de Fondo"
          />
        </div>
      </div>
    </>
  );
};
