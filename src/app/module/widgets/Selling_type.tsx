import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface TypeSelling {
  indexdefault?: number | null;
}

export const Selling_Type: React.FC<TypeSelling> = ({ indexdefault }) => {
  const { watch, setValue, clearErrors, register, formState: { errors } } = useFormContext();

  const options = [
    { label: "In-store selling only", value: "In-store" },
    { label: "Online selling only", value: "Online" },
    { label: "Available both in-store and online", value: "both" },
  ];

  const sellingType = watch("selling_type");

  // Inicializar valor por defecto
  useEffect(() => {
    if (typeof indexdefault === 'number' && options[indexdefault]) {
      const initialValue = options[indexdefault].value;
      setValue("selling_type", initialValue);
    }
  }, [indexdefault, setValue]);

  const handleSelection = (value: string) => {
    setValue("selling_type", value);
    clearErrors("selling_type");
  };

  return (
    <>
      <h1 className="text-2xl mt-5 font-bold">Selling Type</h1>
      <div className="shadow-xl relative shadow-slate-200 border pt-5 pl-11 my-5 px-3 py-6 flex flex-col gap-4 border-gray-300 rounded-2xl">
        {options.map((option, index) => (
          <div key={option.value + index} className="flex items-center mb-4">
            <input
              type="radio"
              id={`sellingType-${option.value}`}
              value={option.value}
              {...register("selling_type", {
                required: "This field is required",
              })}
              checked={sellingType === option.value}
              onChange={() => handleSelection(option.value)}
              className={`${errors.selling_type ? "bg-red-100 border-red-300 focus:ring-red-500 focus:ring-2" : ""} 
                w-4 h-4 border-gray-300 focus:ring-blue-500 text-blue-600 cursor-pointer`}
            />
            <label
              htmlFor={`sellingType-${option.value}`}
              className="ms-2 text-base font-black text-stone-900 cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
        {errors?.selling_type && (
          <span className="text-red-500 absolute italic bottom-3 left-11">
            {errors.selling_type.message as string}
          </span>
        )}
      </div>
    </>
  );
};