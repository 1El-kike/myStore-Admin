import React from 'react'
import { Type_product } from './type_product'
import { textProdct } from '../../model/type_product'
import { TollButtom } from './tollBar'

export const Products = () => {
 
  
const text:string = textProdct


  return (
    <div className='w-full justify-between flex'>
      <div className='m-4 relative md:w-[60%] px-10 w-full h-screen scroll-bar-none'>
        <div className='w-full mb-10'>
          <h2 className='text-3xl text-violet-700 font-bold' >Products</h2>
        <TollButtom/>
        </div>
      <Type_product scale='125' button="bg-gradient-to-tr to-violet-700 from-indigo-500" fondo='bg-gradient-to-tr to-blue-100 from-violet-100' image='/store-logo/logoCompra.jpg' title='Operating System' textsecondary='chnge i do not ' text={text}/>
      <Type_product scale='150' button="bg-gradient-to-tr to-fuchsia-500 from-fuchsia-900" fondo='bg-gradient-to-tr to-rose-100 from-purple-100' image='/store-logo/almacen.jpg' title='Operating System' textsecondary='chnge i do not ' text={text}/>
      <Type_product scale='100' button="bg-gradient-to-tr to-orange-500 from-orange-900" fondo='bg-gradient-to-tr to-orange-100 from-amber-100' image='/store-logo/OIP.jpg' title='Operating System' textsecondary='chnge i do not ' text={text}/>
      </div>
    </div>
  )
}
