import React from 'react'
import { useFormContext } from 'react-hook-form';

interface Input_Text {
    label:string;
    placeholder:string;
    data:string;
}

export const Email_Input:React.FC<Input_Text> = ({label,placeholder,data}) => {

  const { register, formState: { errors } } = useFormContext();


  return (
    <div className="flex relative flex-col">
    <label
      htmlFor={label}
      className="block mb-2 capitalize text-base font-medium text-gray-900"
    >
      {label} 
    </label>
    <input
      type="email"
      {...register("email", { required: "This field is required" })}
      id={label}
      aria-describedby="helper-text-explanation"
      className={ `bg-gray-50 mb-2 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors?.address ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 ": "text-gray-900"}`}
      placeholder={placeholder}
    />
  {errors[data] && <span className="text-red-500 absolute italic -bottom-5">{ errors[data].message }</span>} 
  </div>
  )
}
