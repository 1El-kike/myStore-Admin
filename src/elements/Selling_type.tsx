import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export const Selling_Type: React.FC = () => {
  const isoption = [
    { label: "In-store selling only", value: "In-store" },
    { label: "Online selling only", value: "Online" },
    { label: "Available both in-store and online", value: "both" },
  ];
  const [selectedSellingType, setSelectedSellingType] = useState<number | null>(
    null
  );

  const {watch,clearErrors } = useFormContext()


  // Efecto para manejar el reset del formulario
  useEffect(() => {
    const subscription = watch((value) => {
      if (!value.selling_type) {
        setSelectedSellingType(null); // Restablece a null si no hay tipo de venta seleccionado
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleCheckboxChange = (index: number) => {
    setSelectedSellingType(index); // Actualiza el índice del checkbox seleccionado
    clearErrors("selling_type");
  };

  return (
    <>
      <h1 className="text-2xl mt-5 font-bold">Selling Type</h1>
      <div className="shadow-xl relative shadow-slate-200 border pt-5 pl-11 my-5 px-3 py-6 flex flex-col gap-4  border-gray-300 rounded-2xl">
        {isoption.map((data, index) => {
          return (
            <div key={index} className="flex  items-center mb-4">
              <input
                id={"checkbox" + index}
                type="checkbox"
                {...register("selling_type", {
                  required: "this field is required",
                })}
                checked={selectedSellingType === index}
                onChange={() => handleCheckboxChange(index)}
                value={data.value}
                name="selling_type"
                className={`${errors.selling_type && " bg-red-100 border-red-300 focus:ring-red-500 focus:ring-2"} w-4 h-4  bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 `}
              />
              <label
                htmlFor={"checkbox" + index}
                className="ms-2 text-base font-black text-stone-900 "
              >
                {data.label}
              </label>
            </div>
          );
        })}
        {errors?.selling_type && (
          <span className="text-red-500 absolute italic bottom-3 l-0">
            {errors.selling_type.message}
          </span>
        )}
      </div>
    </>
  );
};
