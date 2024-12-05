import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const EditStores = () => {

    const [isEnter, setisEnter] = useState(false)

    const redirect = useNavigate()


  return (
    <div onMouseLeave={()=> setisEnter(false)} onMouseEnter={()=> setisEnter(true)} className='w-full flex justify-center items-center h-full relative'>
        <img src="/Mindset-de-produto-blogpost-SULTS-min-676x450.jpg" className={`${isEnter && "transition-all duration-300 scale-50 translate-x-16  translate-y-8" } transition-all duration-300 absolute scale-125 aspect-video top-2  clip-editStore`} alt="" />
        <div className='z-20 text-white  w-full pl-5 h-full justify-center items-start flex flex-col '>
            <h1 className='uppercase text-3xl font-extrabold'>Editar Stores</h1>
            <p className='capitalize text-white text-xs md:text-sm text-wrap md:w-[50%]'>This is camp for edit are Stores</p>
            <button onClick={()=> redirect('/stores/edit')} className={`${isEnter && "animate-pulse "} z-10 mt-4 hover:scale-95 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2`}>
            Edit +Stores
          </button>
        </div>
    </div>
  )
}
