import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PUBLIC_URL } from '../../../../../config/env'

export const WatchStore = () => {
  
      const [isEnter, setisEnter] = useState(false)
  
      const redirect = useNavigate()
  
  
    return (
      <div onClick={()=> redirect('/stores/watch')} onMouseLeave={()=> setisEnter(false)} onMouseEnter={()=> setisEnter(true)} className=' w-full flex  justify-center items-center h-full relative'>
          <img src={`${PUBLIC_URL}home/home.jpg`} className={`${isEnter && "scale-125" } transition-all duration-300 absolute clip-watchStore aspect-video`} alt="" />
          <img src={`${PUBLIC_URL}home/home.jpg`} className={`transition-all opacity-20 duration-300 absolute  aspect-video`} alt="" />
          <div className='z-20 text-white  w-full pl-5 h-full justify-center items-start flex flex-col-reverse '>
              <h1 className='uppercase text-3xl font-extrabold'>Watch Stores</h1>
              <p className='capitalize mt-12 text-white text-xs md:text-sm text-wrap md:w-[50%]'>This is camp for wacth you Stores</p>
              {/* <button onClick={()=> redirect('/stores/watchStore')} className={`${isEnter && "animate-pulse"} z-10 mb-4 hover:scale-95 text-white bg-gradient-to-br from-purple-400 to-rose-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2`}>   
              Watch + Stores
            </button> */}
          </div>
      </div>
    )
  }
  
