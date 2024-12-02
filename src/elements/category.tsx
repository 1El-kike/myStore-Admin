import React, { useState } from "react";
import { categoryProduct } from "../model/type_product";
import { useFormContext } from "react-hook-form";




export const Category: React.FC = () => {
  
  const [option, setoption] = useState(categoryProduct);

  const { register, formState: { errors } } = useFormContext();

  const [indiceSeleccionado, setIndiceSeleccionado] = useState<number>(-1);

  // Manejar el cambio en el select
  const manejarCambio = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Obtener el índice de la opción seleccionada
    const nuevoIndice = event.target.selectedIndex - 1;
    setIndiceSeleccionado(nuevoIndice);
};

  return (
    <>
      <h1 className="text-2xl mt-5 font-bold">Category</h1>
      <div className="border shadow-xl shadow-slate-200 my-5 px-3 py-2 flex flex-col border-gray-300 rounded-2xl">
        <label
          htmlFor="category"
          className="block mt-5 mb-2 text-sm font-medium text-gray-900 "
        >
          Product Category
        </label>
        <select
          id="category"
         {...register("category", { required: "This field is required" })}
         onChange={(event)=> manejarCambio(event) } 
          className="block appearance-none w-full  border bg-gray-50 border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white relative  focus:ring-blue-500 focus:border-blue-500 "
        >
          {errors.category && <span className="text-red-500 absolute italic -bottom-5">{ errors.category.message }</span>} 
         <option value="" disabled>Seleccione una opción</option>
         {option.option.map((value, index) => (
            <option key={index + "option"} value={value.category}>
              {value.category}
            </option>
          ))}
          
        </select>
        <div className="relative"> 
        <label
          htmlFor="tipo"
          className="block mb-2  mt-5 text-sm font-medium text-gray-900 "
        >
          Product Category
        </label>
        <select
          id="tipo"
          {...register("tipo", { required: "This field is required"})}
          className={`${errors?.tipo && "block appearance-none bg-red-50 text-red-500 border-red-500"} text-gray-700 py-3 px-4 pr-8 leading-tight bg-gray-50 mb-7 border border-gray-300  rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
       
       >
          {indiceSeleccionado >= 0 ?  option.option[indiceSeleccionado].tipos.map((value, index) => {
            
            return (
              <>
                <option  key={index + "tipos"} value={value.tipo}>
                  {value.tipo}
                </option>
              </>
            );
          }) : 
          <option value="" disabled>Select one Product Category </option>
        }
        </select>
        {errors.tipo  && <span className="text-red-500 absolute italic bottom-0">{ errors.tipo.message }</span>} 
        </div>
      </div>
    </>
  );
};
