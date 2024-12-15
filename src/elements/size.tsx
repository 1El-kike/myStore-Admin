import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

export const Size: React.FC = () => {
  const [open, setopen] = useState(false);
  const [value, setvalue] = useState("S");

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const tallas = ["S", "M", "L", "XL"];
  const colors = ["red","white","blue","black","yellow","green"]

  return (
    <>
      <h1 className="text-2xl mt-5 font-bold">Size and Color </h1>
      <div className="shadow-xl shadow-slate-200 border my-5 px-3 py-2 md:flex-col gap-4  border-gray-300 rounded-2xl">
        <div className="mt-5 mb-2 text-sm font-medium text-gray-900">
          <label htmlFor="search-dropdown" className="">
            Size Products
          </label>
        </div>
        <div className="flex gap-4 relative w-full">
          <div className="  w-full">
            <select
              id="size"
              {...register("size", { required: "This field is required" })}
              className={`${
                errors?.size &&
                "block appearance-none bg-red-50 text-red-500 border-red-500"
              } text-gray-700 py-3 px-4 pr-8 leading-tight bg-gray-50 mb-7 border border-gray-300  rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
            >
              {errors?.size && (
                <span className="text-red-500 absolute italic -bottom-5">
                  {errors.size.message}
                </span>
              )}
              <option value="" disabled>
                Seleccione una opción
              </option>
              {tallas.map((value, index) => (
                <option key={index + "option"} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="  w-full">
            <select
              id="color"
              {...register("color", { required: "This field is required" })}
              className={`${
                errors?.color &&
                "block appearance-none  bg-red-50 text-red-500 border-red-500"
              } text-gray-700 py-3 capitalize px-4 pr-8 leading-tight bg-gray-50 mb-7 border border-gray-300  rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
            >
              {errors?.size && (
                <span className="text-red-500 absolute italic -bottom-5">
                  {errors.color.message}
                </span>
              )}
              <option value="" disabled>
                Seleccione una opción
              </option>
              {colors.map((value, index) => (
                <option className="capitalize" key={index + "option"} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>         
        </div>
      </div>
    </>
  );
};
