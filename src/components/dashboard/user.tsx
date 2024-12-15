import React from 'react'



export const User = () => {
  return (
    <aside className='flex h-1/2 gap-5 flex-col flex-grow justify-center items-center'>
        <div className='flex flex-col justify-center items-center flex-grow'>
                <img src="" className='aspect-auto h-20 w-20 rounded-full bg-slate-300' alt="" />
                <p>Welcome back</p>
                <h1 className='font-bold text-3xl'>Jerome Bell</h1>
        </div>
        <div className='w-full'>
            <div className="flex px-4 gap-3 flex-col w-full">
                <div className="border flex justify-around items-center h-20 border-gray-300 w-full"> 
                    <img src="" className='bg-green-300 rounded-full w-14 h-14' alt="" />
                    <span >
                        <p>Incorme</p>
                        <p className='text-2xl'><b>$62,569</b></p>
                    </span>
                    <div className='h-full flex justify-end w-1/3'>
                    <button className='flex'>...</button>
                    </div>
                </div>
                <div className="border flex justify-around items-center h-20 border-gray-300 w-full"> 
                <img src="" className='bg-red-300 rounded-full w-14 h-14' alt="" />
                    <span >
                        <p>Expense</p>
                        <p className='text-2xl'><b>$62,569</b></p>
                    </span>
                    <div className='h-full flex justify-end w-1/3'>
                    <button className='flex'>...</button>
                    </div>
                </div>
            </div>
        </div>
    </aside>
  )
}
