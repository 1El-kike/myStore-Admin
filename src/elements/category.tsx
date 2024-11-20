import React, { useState } from "react";
import { categoryProduct, TypeCategory } from "../model/type_product";
import useForm from "../hooks/useForm";
import { FormComponentPropsCategory } from "../interface/formComponentProp";



export const Category: React.FC<FormComponentPropsCategory> = ({onFormDataChange}) => {
  const [option, setoption] = useState(categoryProduct);

  const [indiceSeleccionado, setIndiceSeleccionado] = useState<number>(0);

  // Manejar el cambio en el select
  const manejarCambio = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Obtener el índice de la opción seleccionada
    const nuevoIndice = event.target.selectedIndex - 1;
    setIndiceSeleccionado(nuevoIndice);
};

// Usamos el hook con valores iniciales y la función de cambio de datos
const { formData, handleChange } = useForm(
  { category: '', tipo: '' },
  onFormDataChange
);

// Función combinada para manejar el cambio
const handle = (event:any) => {
  
  handleChange(event);
  manejarCambio(event);  // Llama a la primera función
 
};

  return (
    <>
      <h1 className="text-2xl mt-5 font-bold">Category</h1>
      <form className="border shadow-xl shadow-slate-200 my-5 px-3 py-2 flex flex-col border-gray-300 rounded-2xl">
        <label
          htmlFor="countries"
          className="block mt-5 mb-2 text-sm font-medium text-gray-900 "
        >
          Product Category
        </label>
        <select
          id="countries"
         // onChange={manejarCambio}
         name="category"
          onChange={handle } 
          value={formData.category}
          
          className="bg-gray-50 border pl-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
         <option   value="" disabled>Seleccione una opción</option>
          {option.option.map((value, index) => {
            return (
              <>
                <option defaultValue={""} key={index} selected>
                  {value.category}
                </option>
              </>
            );
          })}
          
        </select>
        <label
          htmlFor="countries"
          className="block mb-2  mt-5 text-sm font-medium text-gray-900 "
        >
          Product Category
        </label>
        <select
          id="countries"
          onChange={handleChange} 
          name="tipo"
          value={formData.tipo}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          {option.option[indiceSeleccionado].tipos.map((value, index) => {
           
            return (
              <>
                <option key={index} selected>
                  {value.tipo}
                </option>
              </>
            );
          })}
        </select>
      </form>
    </>
  );
};
