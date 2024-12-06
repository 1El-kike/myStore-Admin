import React from 'react'
import { Button } from './buttom'

interface Type {
  element:string;
  action:string
}

export const Toolbar:React.FC<Type> = ({element,action}) => {
  return (
    <div className='w-full my-5 flex mx-4 md:mx-20'>
        <div className='w-24 flex'>
       <Button  />
        </div>
        <div className='leading-3 tracking-tight'>
            <p>Back to {element}</p>
            <h1 className='text-3xl font-bold'>{action}</h1>
        </div>
    </div>

  )
}
