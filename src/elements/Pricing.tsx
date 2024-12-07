import React from "react";
import { FaDollarSign } from "react-icons/fa6";
import { HiExclamationCircle } from "react-icons/hi";
import { useFormContext } from "react-hook-form";

export const Pricing: React.FC = () => {

  const { register, formState: { errors } } = useFormContext();

  
  return (
    <>
      <h1 className="text-2xl mt-5 font-bold">Pricing </h1>
      <div className="shadow-xl shadow-slate-200 border my-5 px-3 py-2 md:flex gap-4  border-gray-300 rounded-2xl">
        <div className="flex mt-4 mb-2 flex-grow flex-col">
        <label
          htmlFor="website-admin"
          className="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
        >
          Price
        </label>
        <div className="flex relative mb-6  ">
          <span className={`${errors?.price && "bg-red-300 border-red-500 text-red-900"} inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600`}>
          <FaDollarSign />
          </span>
          <input
            type="number"
            {...register("price", { required: "This field is required", min: 0 })}
            id="website-admin"
            className={`${errors?.price && "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "} rounded-none font-extrabold rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="00.00"
          />
           {errors.price && <span className="text-red-500 absolute italic -bottom-7">{ errors.price.message }</span>} 
           
        </div>
        </div>
        <div className="flex mt-4 mb-2 flex-grow flex-col">
        <label
          htmlFor="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          <span className="flex items-center gap-2">Compare at Price <HiExclamationCircle /></span>
        </label>
        <div className="flex relative mb-6 ">
          <span className={`${errors?.website_admin && "bg-red-300 border-red-500 text-red-900"} inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600`}>
          <FaDollarSign />
          </span>
          <input
            type="number"
            {...register("website_admin", { required: "This field is required", min: 0 })}
            id="website-admin"
            className={`${errors?.website_admin && "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "} rounded-none font-extrabold rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="00.00"
          />
          {errors.website_admin && <span className="text-red-500 absolute italic -bottom-7">{ errors.website_admin.message }</span>} 
        </div>
        </div>
      </div>
    </>
  );
};
