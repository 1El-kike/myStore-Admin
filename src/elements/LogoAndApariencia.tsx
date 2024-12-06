import React from 'react'
import { useFormContext } from 'react-hook-form';
import { Image_Input } from './image_Input';

interface TypeImage {
    data: string;
    label: string;
  }

export const LogoAndApariencia = () => {

    const {
        register,
        formState: { errors },
      } = useFormContext();

  return (
    <>
    <h1 className="text-2xl mt-5 font-bold">Logo and Apariencia </h1>
    <div className="shadow-xl shadow-slate-200 border my-5 px-3 py-2 md:flex flex-col gap-4  border-gray-300 rounded-2xl">
    <Image_Input data='imgPortada' label='Imagen de Logo'/>
    <Image_Input data='imgfondo' label='Imagen de Fondo'/>
    </div>
  </>
  )
}
