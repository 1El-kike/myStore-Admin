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

   useEffect(() => {
    if (defaultPrice) {
      setResult((parseFloat(defaultPrice) / 320).toFixed(2));
    }
  }, [defaultPrice]);

  useEffect(() => {
    const subcription = watch((value)=>{
      if (!value.price) {
        setPrice(''); 
      }
      if (!value.comparePrice) {
        setResult('')
      }
    })
    return () =>   subcription.unsubscribe()
  }, [watch('price'),watch('comparePrice')])


  const [price, setPrice] = useState(defaultPrice || ""); // Estado para el primer input
  const [result, setResult] = useState(""); // Estado para el segundo input

  const handlePriceChange = (e: any) => {
    const value = e.target.value;
    setPrice(value); // Actualiza el estado del precio

    // Realiza la división solo si el valor es un número
    if (!isNaN(value) && value !== "") {
      setResult((parseFloat(value) / 320).toFixed(2)); // Divide y formatea a 2 decimales
    } else {
      setResult(""); // Limpia el resultado si no es un número válido
    }

    clearErrors("price");
  };

    

  //Datos para el metodo changeMony para la conversion de dinero
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexCompare, setSelectedIndexCompare] = useState(0);
  const [isMony, setisMony] = useState(false);
  const [isCompareMony, setisCompareMony] = useState(false);
  const typemony: TypeSelectMony[] = [
    { elemen: <FaDollarSign />, value: "dolar" },
    { elemen: <FaEuroSign />, value: "euro" },
    { elemen: <FaLiraSign />, value: "lira" },
    { elemen: <FaWonSign />, value: "won" },
    { elemen: <FaYenSign />, value: "yen" },
  ];

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
            {isMony && (
              <SelectMony
                setIsOpen={setisMony}
                set={setSelectedIndex}
                typemony={typemony}
                indexPosition={selectedIndex}
              />
            )}
            <span
              onClick={() => setisMony(!isMony)}
              className={`${
                errors?.price && "bg-red-300 border-red-500 text-red-900"
              } inline-flex items-center px-3 cursor-pointer  text-gray-900 bg-gray-200 font-extrabold text-sm border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600`}
            >
              {typemony[selectedIndex].elemen}
            </span>
            <input
              type="number"
              step={"0.01"}
              value={price}
              {...register("price", {
                required: "This field is required",
                min: 0,
              })}
              onChange={handlePriceChange}
              id="website-admin"
              className={`${
                errors?.price &&
                "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
              } rounded-none font-extrabold rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="00.00"
            />
            {errors.price && (
              <span className="text-red-500 absolute italic -bottom-7">
                {errors.price.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex mt-4 mb-2 flex-grow flex-col">
          <label
            htmlFor="website-admin"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            <span className="flex items-center gap-2">
              Compare at Price <HiExclamationCircle />
            </span>
          </label>
          <div className="flex relative mb-6 ">
            {isCompareMony && (
              <SelectMony
                setIsOpen={setisCompareMony}
                set={setSelectedIndexCompare}
                typemony={typemony}
                indexPosition={selectedIndexCompare}
              />
            )}
            <span
              onClick={() => setisCompareMony(!isCompareMony)}
              className={`${
                errors?.comparePrice && "bg-red-300 border-red-500 text-red-900"
              } inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600`}
            >
              {typemony[selectedIndexCompare].elemen}
            </span>
            <input
              type="number"
              disabled
              value={result}
              onChange={() => setValue("comparePrice", result)}
              id="website-admin"
              className={`rounded-none font-extrabold rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="00.00"
            />
            {errors.comparePrice && (
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
