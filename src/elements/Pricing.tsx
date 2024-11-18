import React from "react";
import { FaDollarSign } from "react-icons/fa6";
import { HiExclamationCircle } from "react-icons/hi";
import { FormComponentPropsPricing } from "../interface/formComponentProp";
import useForm from "../hooks/useForm";

export const Pricing: React.FC<FormComponentPropsPricing> = ({onFormDataChange}) => {

 // Usamos el hook con valores iniciales y la función de cambio de datos
 const { formData, handleChange, handleSubmit } = useForm(
  { price: 0, },
  onFormDataChange
);
  
  return (
    <>
      <h1 className="text-2xl mt-5 font-bold">Pricing </h1>
      <form className="border my-5 px-3 py-2 md:flex gap-4  border-gray-300 rounded-2xl">
        <div className="flex mt-4 mb-2 flex-grow flex-col">
        <label
          htmlFor="website-admin"
          className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
        >
          Price
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <FaDollarSign />
          </span>
          <input
            type="number"
            onChange={handleChange}
            value={formData.price}
            name="price"
            id="website-admin"
            className="rounded-none font-extrabold rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="00.00"
          />
        </div>
        </div>
        <div className="flex mt-4 mb-2 flex-grow flex-col">
        <label
          htmlFor="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span className="flex items-center gap-2">Compare at Price <HiExclamationCircle /></span>
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          <FaDollarSign />
          </span>
          <input
            type="number"
            id="website-admin"
            className="rounded-none font-extrabold rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="00.00"
          />
        </div>
        </div>
      </form>
    </>
  );
};
