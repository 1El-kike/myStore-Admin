import React from 'react'
import { AddStores } from './addStores'
import { EditStores } from './editStores'
import { DeliteStores } from './deliteStore'

export const SettingStores = () => {
  return (
    <>
    <div className='mt-10 w-full flex flex-wrap h-screen flex-1'>
    <div className='md:w-[60%] w-full flex gap-2 flex-col mx-4 h-[79.2%]'>
    <div className='w-full bg-gradient-to-l from-violet-950 via-blue-800 to-blue-950  rounded-lg h-[30%] md:h-[64.9%] overflow-hidden'>
      <AddStores/>
    </div>
    <div className='flex-col flex md:flex-row gap-2 h-[66%] md:h-[31.3%]'>
    <div className='w-full h-full md:grow bg-slate-500'>""</div>
    <div className='w-full h-full  md:grow bg-lime-500'>""</div>
    </div>
    </div>
    <div className='md:w-[30%] w-full flex flex-col mx-4 md:mx-0 gap-2 h-[100%]'>
    <div className='w-full h-[25%] bg-gradient-to-l from-teal-300 overflow-clip via-teal-500 to-teal-700  rounded-lg'>
      <EditStores/>
    </div>
    <div className='w-full h-[25%] bg-gradient-to-l from-rose-800 overflow-clip via-orange-500 to-orange-700'>
      <DeliteStores/>
    </div>
    <div className='w-full h-[25%] bg-orange-500'>""</div>
    </div>
    
    </div>
    
    </>
  )
}
