import React, { useState } from "react";
import { HiArrowUpCircle } from "react-icons/hi2";
import { useFormContext, Controller } from "react-hook-form";

export const Images = () => {

  const [imagePreview, setImagePreview] = useState<any>(null);
  const { control } = useFormContext();

  return (
    <>
      <h1 className="text-2xl mt-5 font-bold flex items-center gap-2">
        Product Images <HiArrowUpCircle />
      </h1>
      <form className="shadow-xl shadow-slate-200 border my-5 px-3 py-7 md:flex gap-4  border-gray-300 rounded-2xl">
        <div className="grow basis-44">
          <label
            htmlFor="dropzone-file"
            className="flex h-full flex-col items-center justify-center w-full h-34 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-center text-sm text-gray-500 ">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </div>
            <Controller
              name="image" // Nombre del campo en el formulario
              control={control}
              render={({ field }) => (
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*" // Aceptar solo imágenes
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files; // Obtener los archivos

                    if (files && files.length > 0) {
                      field.onChange(files[0]); // Actualizar el campo con el primer archivo seleccionado

                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setImagePreview(reader.result); // Establecer vista previa de la imagen
                      };
                      reader.readAsDataURL(files[0]); // Leer el archivo como URL de datos
                    }
                  }}
                />
              )}
            />
            {/* <input id="dropzone-file" type="file" className="hidden" /> */}
          </label>
        </div>
        <div className="grow flex justify-center items-center md:w-52 overflow-clip bg-gray-400 after:bg-slate-950 after:contents rounded-2xl relative">
          <div className="absolute z-20 w-full bg-black h-full rounded-2xl bg-opacity-30  flex flex-col justify-center items-center gap-2">
            <button
              type="button"
              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-32"
            >
              Remplace
            </button>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-32"
            >
              Remove
            </button>
          </div>
          <img className="scale-150 " src="/description/image(2).png"></img>
        </div>
        <div className="grow">
          <div className="md:w-36 overflow-clip h-28 justify-center items-center flex rounded-2xl mb-2 bg-yellow-700">
          <img className=" scale-150 bg-slate-100  bg-opacity-50 " src="/description/image.png"></img>
          </div>
          <div className="md:w-36 bg-lime-200 overflow-clip  justify-center items-center flex rounded-2xl h-28">
          <img className="  scale-150 bg-slate-800  bg-opacity-50" src="/description/IMAGE.jpg"></img>
          </div>
        </div>
      </form>
    </>
  );
};
