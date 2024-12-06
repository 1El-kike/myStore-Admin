import React from "react";
import { useFormContext } from "react-hook-form";

interface TypeImage {
  data: string;
  label: string;
}

export const Image_Input: React.FC<TypeImage> = ({ label, data }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
        <div className="flex mt-4 mb-2 flex-grow flex-col">
          <label
            htmlFor={data}
            className="block mb-2  text-base font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>

          <input
          id={data}
            {...register(data, { required: "This field is required" })}
            className={`bg-gray-50 mb-2 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  ${
              errors?.[data]
                ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full"
                : "text-gray-900"
            }`}
            type="file"
          />
        
        </div>

  );
};
