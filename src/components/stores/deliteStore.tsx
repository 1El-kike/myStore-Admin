import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const DeliteStores = () => {

    const [isEnter, setisEnter] = useState(false)

    const redirect = useNavigate()


  return (
    <div onMouseLeave={()=> setisEnter(false)} onMouseEnter={()=> setisEnter(true)} className='w-full flex justify-center items-center h-full relative'>
        <img src="/pngtree-stunning-3d-render-of-a-modern-supermarket-image_13561321.png" className={`${isEnter && "transition-all duration-300 scale-50 translate-x-16  translate-y-8" } transition-all duration-300 absolute scale-150 aspect-video top-2  clip-deiteStore`} alt="" />
        <div className='z-20 text-white  w-full pl-5 h-full justify-center items-start flex flex-col '>
            <h1 className='uppercase text-3xl font-extrabold'>Delite Stores</h1>
            <p className='capitalize text-white text-xs md:text-sm text-wrap md:w-[50%]'>This is camp for edit are Stores</p>
            <button onClick={()=> redirect('/stores/delite')} className={`${isEnter && "animate-pulse "} z-10 mt-4 hover:scale-95 text-white bg-gradient-to-br from-orange-400 to-rose-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2`}>
            Delite +Stores
          </button>
        </div>
    </div>
  )
}
