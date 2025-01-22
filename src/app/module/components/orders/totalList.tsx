import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { FaClipboardList, FaShopify } from 'react-icons/fa6'

export 
const TotalList =()=> {
    return (
        <>
        <div className='border flex justify-between items-center w-full rounded-xl shadow-lg shadow-gray-300 py-4 px-2 border-gray-300 '>
            <div className='grow basis-28  flex justify-center items-center'>
              <div className='flex-col md:flex-row flex flex-wrap gap-4 justify-center border-r-1 w-full border-gray-400 items-center'>
                <div className='bg-gradient-to-bl from-slate-200 to-rose-300 border-1 border-rose-950 rounded-full p-4'><FaShopify size={32}/>
              </div>
                <div className=''>
                  <p className='text-xs line-clamp-1  md:text-base'>Total Orders</p>
                  <div className='font-extrabold text-xl relative text-rose-950 md:text-3xl'>871
                    <div className='blur-xl w-full h-full absolute top-1 -z-10'>
                    <div className='absolute w-[200px] h-full bg-violet-500  clip-fondo '></div>
                    </div>
                    <div className='blur-xl w-full h-full absolute -top-7 right-64 -z-10'>
                    <div className='absolute w-[200px] h-full bg-sky-400  clip-fondo '></div>
                    </div>
                  </div>
                </div>
                </div>
            </div>
            <div className='grow basis-28  flex justify-center items-center'>
              <div className='flex-col md:flex-row flex flex-wrap gap-4 justify-center border-r-1 w-full border-gray-400 items-center'>
                <div className='bg-gradient-to-bl from-slate-200 to-rose-300 border-1 border-rose-950 rounded-full p-4'><FaClipboardList size={32}/>
              </div>
                <div className=''>
                  <p className='text-xs line-clamp-1 md:text-base'>Active Orders</p>
                  <div className='font-extrabold text-xl relative text-rose-950 md:text-3xl'>871
                    <div className='blur-xl w-full h-full absolute top-0 -z-10'>
                    <div className='absolute w-[200px] h-full bg-violet-500  clip-fondo '></div>
                    </div>
                    <div className='blur-xl w-full h-full absolute -top-7 right-64 -z-10'>
                    <div className='absolute w-[200px] h-full bg-sky-400  clip-fondo '></div>
                    </div>
                  </div>
                </div>
                </div>
            </div>
            <div className='grow basis-28  flex justify-center items-center'>
              <div className='flex-col md:flex-row flex flex-wrap gap-4 justify-center w-full border-gray-400 items-center'>
                <div className='bg-gradient-to-bl from-slate-200 to-rose-300 border-1 border-rose-950 rounded-full p-4'><FaCheckCircle size={32}/>
                </div>
                <div className=''>
                  <p className='text-xs line-clamp-1  md:text-base'>Completed Orders</p>
                  <div className='font-extrabold text-xl relative text-rose-950 md:text-3xl'>871
                    <div className='blur-xl w-full h-full absolute top-0 -z-10'>
                    <div className='absolute w-[200px] h-full bg-violet-500  clip-fondo '></div>
                    </div>
                    <div className='blur-xl w-full h-full absolute -top-7 right-64 -z-10'>
                    <div className='absolute w-[200px] h-full bg-sky-400  clip-fondo '></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>

        </>
    )
}
