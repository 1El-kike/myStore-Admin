import React from 'react'
import { useFormContext } from 'react-hook-form';

interface TypeTimeInput {
    label:string;
    data:string;
    placeholder:string;
    time:string;
}

export const TimeInput:React.FC<TypeTimeInput> = ({label, data ,time,placeholder}) => {


    const { register, formState: { errors } } = useFormContext();


    return (
      <div className="flex justify-center gap-4 items-center  relative">
      <label
        htmlFor={label}
        className="block  capitalize text-base font-medium text-gray-900"
      >
        {label} 
      </label>
      <input
        type="time"
        {...register(data, { required: "This field is required" })}
        id={label}
        aria-describedby="helper-text-explanation"
        className={ `bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors[data] ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 ": "text-gray-900"}`}
        placeholder={placeholder}
      />
    {errors[data] && <span className="text-red-500 absolute italic -bottom-5">{ errors[data].message }</span>} 
    <p>{time}</p>
    </div>
    )
  }