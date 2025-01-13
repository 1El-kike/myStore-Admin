import React from "react";
import { useFormContext } from "react-hook-form";

interface InventType {
  data1: string;
  data2: string;
  label1: string;
  label2: string;
}

export const Inventoy: React.FC<InventType> = ({
  data1,
  data2,
  label1,
  label2,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <h1 className="text-2xl mt-5 font-bold">Inventory</h1>
      <div className="shadow-xl shadow-slate-200 border my-5 px-3 py-2 md:flex gap-4  border-gray-300 rounded-2xl">
        <div className="flex relative mt-3 flex-col">
          {label1 == "Tipo de Inventario" ? (
            <>
              <label
                htmlFor={label1}
                className="block mb-2 text-base font-medium text-gray-900"
              >
                {label1}
              </label>
              <select
                id={label1}
                {...register(data1, { required: "This field is required" })}
                className={`${
                  errors[data1] &&
                  "block appearance-none bg-red-50 text-red-500 border-red-500"
                } text-gray-700 py-3 px-4 pr-8 leading-tight bg-gray-50 border border-gray-300  rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
              >
                {errors[data1] && (
                  <span className="text-red-500 absolute italic -bottom-0">
                    {errors[data1].message}
                  </span>
                )}
                <option value="" disabled>
                  Seleccione una opción
                </option>
                <option>In-stores</option>
                <option>Online</option>
                <option>Mixto</option>
              </select>
              {errors[data1] && (
                <span className="text-red-500 absolute italic -bottom-0">
                  {errors[data1].message}
                </span>
              )}
            </>
          ) : (
            <>
              <label
                htmlFor={label1}
                className="block mb-2 text-base font-medium text-gray-900"
              >
                {label1}
              </label>
              <input
                type="text"
                id={label1}
                {...register(data1, {
                  required: "This field is required",
                  min: 0,
                })}
                aria-describedby="helper-text-explanation"
                className={`${
                  errors[data1] &&
                  "block appearance-none bg-red-50 text-red-500 border-red-500"
                } text-gray-700 py-3 px-4 pr-8 leading-tight bg-gray-50 mb-7 border border-gray-300  rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                placeholder="Product"
              />
              {errors[data1] && (
                <span className="text-red-500 absolute italic -bottom-0">
                  {errors[data1].message}
                </span>
              )}
            </>
          )}
        </div>
        <div className="flex relative mt-3 grow flex-col">
          <label
            htmlFor={label2}
            className="block mb-2 text-base font-medium text-gray-900"
          >
            {label2}
          </label>
          <input
            type="text"
            id={label2}
            {...register(data2, { required: "This field is required" })}
            aria-describedby="helper-text-explanation"
            className={`${
              errors[data2] &&
              "block appearance-none bg-red-50 text-red-500 border-red-500"
            } text-gray-700 py-3 px-4 pr-8 leading-tight bg-gray-50 mb-7 border border-gray-300  rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
            placeholder="01L-CFR-09S"
          />
          {errors[data2] && (
            <span className="text-red-500 absolute italic -bottom-0">
              {errors[data2].message}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
