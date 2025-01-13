import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';

interface NumberInput {
    label:string;
    data:string;
}

export const Number_Input:React.FC<NumberInput> = ({label,data}) => {

  const { control, formState: { errors } } = useFormContext();


  return (
    <div className="flex relative flex-col">
    <label
      htmlFor={label}
      className="block mb-2 capitalize text-base font-medium text-gray-900"
    >
      {label} 
    </label>
    <Controller
    name={data}
    control={control}
    render={({field})=> (
        <input
        {...field}
        type='tel'
        className={`bg-gray-50 mb-2 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors[data] ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 ": "text-gray-900"}`}
        placeholder='Number de telefono'
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        />
    )}
    >
    </Controller>
    {errors[data] && <span className="text-red-500 absolute italic -bottom-9 l-0">{ errors[data].message }</span>} 
    </div>
  )
}
