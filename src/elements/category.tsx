import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { TypeCategory } from "../interface/TypeCategory";

interface Category {
  label1: string;
  label2:string;
  data1:string;
  data2:string;
  select:TypeCategory;
 index?:any
}


export const Category: React.FC<Category> = ({label1,label2,index,data1,data2,select}) => {
  
  const [option, setoption] = useState(select);

  const { register, formState: { errors } ,setValue,clearErrors} = useFormContext();

  const [indiceSeleccionado, setIndiceSeleccionado] = useState<number>(-1);

  // Manejar el cambio en el select
  const manejarCambio = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Obtener el índice de la opción seleccionada
    const nuevoIndice = event.target.selectedIndex - 1;
    setIndiceSeleccionado(nuevoIndice);
    setValue(data1,event.target.value);
    clearErrors(data1)
};

useEffect(() => {
   if (index) {
    option.option.map( (element,num) => {
      element.category == index &&
      setIndiceSeleccionado(num)
    })
  } 

  console.log(index)
}, [index])


  return (
    <>
      <h1 className="text-2xl mt-5 font-bold">Category</h1>
      <div className="border shadow-xl shadow-slate-200 my-5 px-3 py-2 flex flex-col border-gray-300 rounded-2xl">
        <div className="relative">
        <label
          htmlFor={label1}
          className="block mt-5 capitalize mb-2 text-sm font-medium text-gray-900 "
          >
          {label1}
        </label>
        <select
          id={label1}
          {...register(data1, { required: "This field is required" })}
          onChange={(event)=> manejarCambio(event) } 
          className={`${errors[data1] && "block appearance-none bg-red-50 text-red-500 border-red-500"} text-gray-700 py-3 px-4 pr-8 leading-tight bg-gray-50 mb-7 border border-gray-300  rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}   
          >
          {errors[data1] && <span className="text-red-500 absolute italic -bottom-5">{ errors[data1].message }</span>} 
         <option value="" disabled>Seleccione una opción</option>
         {option.option.map((value, index) => (
           <option key={index + "option"} value={value.category}>
              {value.category}
            </option>
          ))}
          
        </select>
        {errors[data1]  && <span className="text-red-500 absolute italic bottom-0">{ errors[data1].message }</span>} 
       </div>
        <div className="relative"> 
        <label
          htmlFor={label2}
          className="block mb-2  mt-5 text-sm font-medium text-gray-900 "
        >
         {label2}
        </label>
        <select
          id={label2}
          {...register(data2, { required: "This field is required"})}
          className={`${errors[data2] && "block appearance-none bg-red-50 text-red-500 border-red-500"} text-gray-700 py-3 px-4 pr-8 leading-tight bg-gray-50 mb-7 border border-gray-300  rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
       
       >
          {indiceSeleccionado >= 0 ?  option.option[indiceSeleccionado].tipos.map((value, index) => {
            
            return (
              <>
                <option  key={index + data2} value={value.tipo}>
                  {value.tipo}
                </option>
              </>
            );
          }) : 
          <option value="" disabled>Select one Product Category </option>
        }
        </select>
        {errors[data2]  && <span className="text-red-500 absolute italic bottom-0">{ errors[data2].message }</span>} 
        </div>
      </div>
    </>
  );
};
