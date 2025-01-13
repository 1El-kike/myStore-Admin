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

interface Type {
  elemen: any;
  value: string;
}

export const Pricing: React.FC = () => {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
    clearErrors
  } = useFormContext();

  const [isMony, setisMony] = useState(false);
  const [isCompareMony, setisCompareMony] = useState(false);
  const typemony: Type[] = [
    { elemen: <FaDollarSign />, value: "dolar" },
    { elemen: <FaEuroSign />, value: "euro" },
    { elemen: <FaLiraSign />, value: "lira" },
    { elemen: <FaWonSign />, value: "won" },
    { elemen: <FaYenSign />, value: "yen" },
  ];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexCompare, setSelectedIndexCompare] = useState(0);
  const radius = 50; // Radio del círculo
  const [price, setPrice] = useState(""); // Estado para el primer input
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

    clearErrors("price")
  };

  //funcion de select el tipo de moneda
  const SelectMony: React.FC<{
    set: React.Dispatch<React.SetStateAction<number>>;
    indexPosition: number;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }> = React.memo(({ set, indexPosition, setIsOpen }) => {
    const totalItems = typemony.length;
    console.log("this is test");
    const rotatetop = () => {
      set((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
    };

    const rotatebottom = () => {
      set((prevIndex) => (prevIndex + 1) % totalItems);
    };

    return (
      <>
        <div className="absolute bottom-[225px] -left-8 lg:-left-[110px] lg:bottom-[182px]  z-20 animate-opacityonly">
          {typemony.map((item, index) => {
            const angle = (index / totalItems) * (2 * Math.PI); // Convertir a radianes
            const x = radius * Math.cos(angle) + radius; // Ajustar para centrar
            const y = radius * Math.sin(angle) + radius; // Ajustar para centrar

            return (
              <div
                key={item.value}
                className="absolute bg-gray-200 rounded-md border border-gray-500 p-3"
                style={{
                  position: "absolute",
                  left: `${x}px`,
                  top: `${y}px`,
                  opacity: index === indexPosition ? 1 : 0.5,
                  transition: "opacity 0.3s, transform 0.3s",
                  transform:
                    index === indexPosition ? "scale(1.2)" : "scale(1)",
                }}
              >
                {item.elemen}
              </div>
            );
          })}
          <div
            onMouseLeave={() => setIsOpen(false)}
            className="absolute p-10 -left-[10px] top-[105px] gap-3 flex "
          >
            <button
              type="button"
              className="border animate-pulsesecondy hover:animate-none border-gray-300 bg-gray-200 px-2  rounded-md py-1"
              onClick={rotatetop}
            >
              ←
            </button>
            <button
              type="button"
              className="border animate-pulsesecondy hover:animate-none border-gray-300 bg-gray-200 px-2 rounded-md  py-1"
              onClick={rotatebottom}
            >
              →
            </button>
          </div>
        </div>
      </>
    );
  });

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
}, [watch])


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
