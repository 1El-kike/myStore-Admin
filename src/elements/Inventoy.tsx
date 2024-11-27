import React from 'react'
import { useFormContext } from 'react-hook-form';



export const Inventoy: React.FC = () => {

  const { register, formState: { errors } } = useFormContext();
  

  return (
    <>
    <h1 className="text-2xl mt-5 font-bold">Inventory</h1>
      <form className="shadow-xl shadow-slate-200 border my-5 px-3 py-2 md:flex gap-4  border-gray-300 rounded-2xl">
      <div className="flex relative mb-6 mt-3 flex-col">
        <label
          htmlFor="Quantity"
          className="block mb-2 text-base font-medium text-gray-900"
        >
         Quantity
        </label>
        <input
          type="number"
          id="Quantity"
          {...register("quantity", { required: "This field is required",min: 0 })}
          aria-describedby="helper-text-explanation"
          className={`bg-gray-50 border ${errors?.quantity && "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "} border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
          placeholder="Product"
        />
          {errors?.quantity && <span className="text-red-500 absolute -bottom-5">{ errors?.quantity.message }</span>} 
      </div>
      <div className="flex relative mb-8 mt-3 grow flex-col">    
        <label
          htmlFor="helper-text"
          className="block mb-2 text-base font-medium text-gray-900"
        >
         SKU(Option)
        </label>
        <input
          type="text"
          id="helper-text"
          {...register("sku", { required: "This field is required" })}
          aria-describedby="helper-text-explanation"
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors?.sku && "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "}} `}
          placeholder="01L-CFR-09S"
        />
         {errors.sku && <span className="text-red-500 absolute -bottom-7">{ errors.sku.message }</span>} 
      </div>
      </form>
    </>
  )
}
