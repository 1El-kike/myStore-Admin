import { Textarea } from '@nextui-org/react'
import React from 'react'

interface TypeTextarea {
    placeholder:string;
    label:string
}

export const TextareaComponent:React.FC<TypeTextarea>  = ({placeholder,label}) => {
  return (
    <>
    <div className='flex flex-col justify-start gap-2 items-start  relative'>

      <label
          htmlFor={label}
          className="block  capitalize text-base font-medium text-gray-900"
          >
          {label}
        </label>
    <Textarea
    isClearable
    className="bg-slate-50 rounded-lg  hover:!border-default hover:!shadow-none"
    placeholder={placeholder}
    variant="bordered"
    // eslint-disable-next-line no-console
    onClear={() => console.log("textarea cleared")}
    />
    </div>
    </>
  )
}
