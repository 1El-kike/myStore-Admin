import React from 'react'
import { Button } from './buttom'

export const Toolbar = () => {
  return (
    <div className='w-full my-5 flex mx-4 md:mx-20'>
        <div className='w-24 flex'>
       <Button  />
        </div>
        <div className='leading-3 tracking-tight'>
            <p>Back to product</p>
            <h1 className='text-3xl font-bold'>Add New Product</h1>
        </div>
    </div>

  )
}
