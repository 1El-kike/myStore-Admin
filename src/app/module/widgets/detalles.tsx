import React from 'react'
import { Input_text } from './Input_text';
import { Number_Input } from './number_Input';
import { Email_Input } from './email_Input';
import { TimeInput } from './timeInput';
import { Input_Adress } from './input_adress';


export const Detalles = ()=> {


  return (
   <>
   {/* Detalles de conctacto */}
    <h1 className="text-2xl mt-5 font-bold">Detail Contact</h1>
    <div className="shadow-xl pb-10 shadow-slate-200 border my-5 px-3 py-2 flex flex-col gap-6 border-gray-300 rounded-2xl">
     <Input_Adress data='address' placeholder='calle 106 e/ 227A y 342' label='Address'/>
     <Number_Input data='phone' label='Phone Number Principal' />
     <Number_Input data='phone2' label='Phone Number Alternativo' />
    <Email_Input data='email' placeholder='example@.com' label='Email'/>
    <div>
    <h1 className='capitalize mb-2  text-base font-medium text-gray-900'> Horario de atencion al publico</h1>
    <div className='flex justify-around'>
    <TimeInput time='AM' data='timeInitial' placeholder='8:00' label='Initial'/>
    <TimeInput time='PM' data='timeEnd' placeholder='5:00' label='Initial'/>
    </div>
    </div>

    </div>
   </>
  )
}
