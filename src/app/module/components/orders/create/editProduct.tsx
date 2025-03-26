import React, { useEffect, useState } from "react";
import { port } from "../../../../../config/env";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { MdRemove } from "react-icons/md";
import { updateTable } from "../../../core/filtertableandSearch";
import { useFormContext } from "react-hook-form";

interface TypeProduct {
    description: string;
    quantity_total: string;
    tipo: string;
    category: string;
    inventoryStatus: string;
    id: number;
    onActionChange: (action: any) => void;
    img: string;
    quantity: number; // Nuevo prop
}

export const EditProduct: React.FC<TypeProduct> = ({
  description,
  id,
  inventoryStatus,
  category,
  quantity_total,
  onActionChange,
  tipo,
  img,
}) => {


   const { datosTable } = updateTable();

  
   const dataItems = datosTable.filter((e:any)=> e.id == id)
   const [data, setdata] = useState(dataItems)
   console.log(data)
   const {watch,setValue} = useFormContext();

  const handleRemove = () => {
    const currentItems = watch("items") || [];
  // 2. Filtrar el elemento a eliminar
  const updatedItems = currentItems.filter((item:any) => item.productId !== id);
  // 3. Actualizar el formulario
  setValue("items", updatedItems);
   // Enviar señal de eliminación al padre
   
  };

  const moreQuantity = () => {
    setdata((prev: any[]) => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  }


  useEffect(() => {
   if (data) {
    onActionChange(data)
    console.log(data)
   }

  }, [data])

  const lessQuantity = () => {
         setdata((prev: any[]) => 
        prev.map(item => 
          item.id === id && item.quantity > 1 // Evitar cantidades negativas
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        )
      );
  };

  return (
    <>
      <div className="flex flex-wrap justify-around">
        <div className=" flex  flex-col justify-center">
          <div className="w-72 flex m-auto">{description}</div>
          <div className="flex text-sm flex-wrap gap-4 justify-around mt-2">
            <div>
              <b>Type: </b>
              {tipo}
            </div>
            <div>
              <b>Category: </b> {category}
            </div>
          </div>
          <div className="flex my-5 justify-center items-center gap-1 animate-appearance-in">
            <div
               onClick={() => handleRemove()}
              aria-label="Eliminar producto"
              className="bg-gradient-to-br mr-1 hover:scale-110 duration-250 active:scale-95 focus:ring-2 cursor-pointer from-slate-500 to-slate-600 rounded-lg p-2"
            >
              <FaTrashAlt color="white" />
            </div>
            <div
             onClick={() => lessQuantity()}
              aria-label="Reducir cantidad"
              className="bg-gradient-to-br hover:scale-110 duration-250 active:scale-95 focus:ring-2 cursor-pointer from-slate-50 to-slate-200 rounded-lg p-1"
            >
              <MdRemove size={24} />
            </div>
            <div className="mx-2 text-md">{data[0].quantity}</div>
            <div
               onClick={() => moreQuantity()}
              aria-label="Aumentar cantidad"
              className="bg-gradient-to-br hover:scale-110 active:scale-95 cursor-pointer duration-250 from-sky-500 to-violet-500 rounded-lg p-2"
            >
              <FaPlus />
            </div>
          </div>
        </div>
        <div className="relative w-44">
          <img
            src={port + img}
            className="w-44 h-44 rounded-xl"
            alt="Not Found"
          ></img>
          <div className="bg-red-500 absolute -top-2 px-2 rounded-xl bg-opacity-90 -right-5">
            {inventoryStatus}
          </div>
          <div><b>Quantity disponible: </b> <span >{quantity_total}</span></div>
        </div>
      </div>
    </>
  );
};
