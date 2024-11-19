import React, { useState } from "react";
import { FormComponentPropsShipping_Delivery } from "../interface/formComponentProp";
import useForm from "../hooks/useForm";

export const Shipping_Delivery: React.FC<
  FormComponentPropsShipping_Delivery
> = ({ onFormDataChange }) => {
  const [open, setopen] = useState(false);
  const [value, setvalue] = useState("kg");

  const opens = () => {
    setopen(!open);
  };
  const select = (e: string) => {
    setvalue(e);
    setopen(false);
  };

  const array = ["kg", "mg", "g", "tg"];

  // Usamos el hook con valores iniciales y la función de cambio de datos
  const { formData, handleChange, handleSubmit } = useForm(
    { items_weight: "" },
    onFormDataChange
  );

  // Formatear el valor al perder el foco
  const handleBlur = () => {
    if (formData.items_weight) {
      // Convertir a número y formatear con dos decimales
      const formattedValue = parseFloat(formData.items_weight).toFixed(2);
    }
  };

  return (
    <>
      <h1 className="text-2xl mt-5 font-bold">Shipping and Delivery </h1>
      <form className="shadow-xl shadow-slate-200 border my-5 px-3 py-2 md:flex-col gap-4  border-gray-300 rounded-2xl">
        <div className="mt-5 mb-2 text-sm font-medium text-gray-900">
          <label htmlFor="search-dropdown" className="">
            Items Weight
          </label>
        </div>
        <div className="flex relative w-full">
          <div className=" w-full">
            <input
              type="number"
              id="search-dropdown"
              value={formData.items_weight}
              name="items_weight"
              onChange={handleChange}
              onBlur={handleBlur} // Formatear al perder el foco
              className="block p-2.5 w-full z-20 border-e-0 text-base font-extrabold text-gray-900 bg-gray-50 rounded-s-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="0.00"
              required
            />
          </div>
          <button
            onClick={opens}
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            className="flex-shrink-0  z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-s-0 border-gray-300  rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 "
            type="button"
          >
            {value}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            className={
              open == false
                ? "hidden"
                : "" +
                  "py-2 px-2 z-10 absolute right-0 top-11 bg-white divide-y divide-gray-100 rounded-lg shadow w-auto "
            }
          >
            <ul
              className="py-2 text-sm text-gray-700"
              aria-labelledby="dropdown-button"
            >
              {array.map((data, index) => {
                return (
                  <li key={index}>
                    <a
                      href="#"
                      onClick={() => select(data)}
                      className="block px-4 py-2 hover:bg-gray-200 rounded-xl"
                    >
                      {data}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <h1 className="font-bold text-base my-4">
          Package Size(The package you to ship your product)
        </h1>
        <div className="flex gap-2">
          <div className="flex-grow relative flex flex-col justify-start items-start">
            <label className="mb-2" htmlFor="Length">
              Length
            </label>
            <span className="absolute right-3 text-gray-600 bottom-2.5 font-bold z-20">
              In
            </span>
            <input
              type="number"
              id="Length"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 pr-8 font-extrabold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="00.00"
            />
          </div>
          <div className="flex-grow relative flex flex-col justify-start items-start">
            <label className="mb-2" htmlFor="Breadth">
              Breadth
            </label>
            <span className="absolute right-3 text-gray-600 bottom-2.5 font-bold z-20">
              In
            </span>
            <input
              type="number"
              id="Breadth"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 pr-8 font-extrabold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="00.00"
            />
          </div>
          <div className="flex-grow relative flex flex-col justify-start items-start">
            <label className="mb-2" htmlFor="Width">
              Width
            </label>
            <span className="absolute right-3 text-gray-600 bottom-2.5 font-bold z-20">
              In
            </span>
            <input
              type="number"
              id="Width"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 pr-8 font-extrabold  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="00.00"
            />
          </div>
        </div>
      </form>
    </>
  );
};
