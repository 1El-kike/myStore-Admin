import React, { useEffect, useState } from "react";
import {
  FaDollarSign,
  FaEuroSign,
  FaLiraSign,
  FaWonSign,
  FaYenSign,
} from "react-icons/fa6";
import { HiExclamationCircle } from "react-icons/hi";
import { useFormContext } from "react-hook-form";
import { SelectMony, TypeSelectMony } from "./changeMony";

interface TypePrice {
  defaultPrice?: string | null;
}

export const Pricing: React.FC<TypePrice> = ({ defaultPrice }) => {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext();

  const price = watch("price");
  const comparePrice = watch("comparePrice");

  // Inicializar valores por defecto
  useEffect(() => {
    if (defaultPrice) {
      const initialValue = parseFloat(defaultPrice).toFixed(2);
      setValue("price", initialValue);
      setValue("comparePrice", (parseFloat(initialValue) / 320).toFixed(2));
    }
  }, [defaultPrice, setValue]);

  // Actualizar comparePrice cuando cambia price
  useEffect(() => {
    if (price) {
      const numericValue = parseFloat(price);
      if (!isNaN(numericValue)) {
        const calculated = (numericValue / 320).toFixed(2);
        setValue("comparePrice", calculated);
      }
    } else {
      setValue("comparePrice", "");
    }
  }, [price, setValue]);

  // Datos para la selección de moneda
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexCompare, setSelectedIndexCompare] = useState(0);
  const [isMony, setIsMony] = useState(false);
  const [isCompareMony, setIsCompareMony] = useState(false);
  
  const typemony: TypeSelectMony[] = [
    { elemen: <FaDollarSign />, value: "dolar" },
    { elemen: <FaEuroSign />, value: "euro" },
    { elemen: <FaLiraSign />, value: "lira" },
    { elemen: <FaWonSign />, value: "won" },
    { elemen: <FaYenSign />, value: "yen" },
  ];


  return (
    <>
      <h1 className="text-2xl mt-5 font-bold">Pricing</h1>
      <div className="shadow-xl shadow-slate-200 border my-5 px-3 py-2 md:flex gap-4 border-gray-300 rounded-2xl">
        {/* Price Input */}
        <div className="flex mt-4 mb-2 flex-grow flex-col">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Price
          </label>
          <div className="flex relative mb-6">
            {isMony && (
              <SelectMony
                setIsOpen={setIsMony}
                set={setSelectedIndex}
                typemony={typemony}
                indexPosition={selectedIndex}
              />
            )}
            <span
              onClick={() => setIsMony(!isMony)}
              className={`${
                errors?.price && "bg-red-300 border-red-500 text-red-900"
              } inline-flex items-center px-3 cursor-pointer text-gray-900 bg-gray-200 font-extrabold text-sm border rounded-e-0 border-gray-300 border-e-0 rounded-s-md`}
            >
              {typemony[selectedIndex].elemen}
            </span>
            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: "This field is required",
                min: 0,
                onChange: () => clearErrors("price"),
              })}
              className={`${
                errors?.price &&
                "bg-red-50 border border-red-500 text-red-900 placeholder-red-700"
              } rounded-none font-extrabold rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5`}
              placeholder="00.00"
            />
            {errors.price && (
              <span className="text-red-500 absolute italic -bottom-7">
                {errors.price.message}
              </span>
            )}
          </div>
        </div>

        {/* Compare Price Input */}
        <div className="flex mt-4 mb-2 flex-grow flex-col">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            <span className="flex items-center gap-2">
              Compare at Price <HiExclamationCircle />
            </span>
          </label>
          <div className="flex relative mb-6">
            {isCompareMony && (
              <SelectMony
                setIsOpen={setIsCompareMony}
                set={setSelectedIndexCompare}
                typemony={typemony}
                indexPosition={selectedIndexCompare}
              />
            )}
            <span
              onClick={() => setIsCompareMony(!isCompareMony)}
              className={`${
                errors?.comparePrice && "bg-red-300 border-red-500 text-red-900"
              } inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md`}
            >
              {typemony[selectedIndexCompare].elemen}
            </span>
            <input
              type="number"
              disabled
              {...register("comparePrice")}
              value={comparePrice || ""}
              className="rounded-none font-extrabold rounded-e-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
              placeholder="00.00"
            />
            {errors.comparePrice  && (
              <span className="text-red-500 absolute italic -bottom-7">
                {errors.comparePrice.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
