import React, { useState } from "react";


export const Selling_Type : React.FC = () => {

  const isoption = ["In-store selling only","Online selling only","Avaliable both in-store and online"];
  const [selectedSellingType, setSelectedSellingType] = useState<number | null>(null);

  const handleCheckboxChange = (index: number) => {
    setSelectedSellingType(index); // Actualiza el índice del checkbox seleccionado
  };

  return (
    <>
      <h1 className="text-2xl mt-5 font-bold">Selling Type</h1>
      <form className="shadow-xl shadow-slate-200 border pt-5 pl-11 my-5 px-3 py-2 flex flex-col gap-4  border-gray-300 rounded-2xl">
        {isoption.map((data,index)=>{
        return   <div key={index} className="flex items-center mb-4">
          <input
            id={"checkbox" + index}
            type="checkbox"
            checked={selectedSellingType === index} 
            onChange={() => handleCheckboxChange(index)} 
            onClick={(e)=> console.log(e.target)}
            name='selling_type'
            className="w-4 h-4  bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
          />
          <label
            htmlFor={"checkbox" + index}
            className="ms-2 text-base font-black text-stone-900 "
          >
           {data}
          </label>
                </div>
        })}
      </form>
    </>
  );
};
