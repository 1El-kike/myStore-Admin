import React, { memo } from 'react'

interface DetaillProps {
    children: any
}

export const DetaillOrder = memo(({ children }: DetaillProps) => {
    return (
        <div className='w-full mt-5 flex justify-between h-full inset-0'>
            <div className='flex w-full'>
                <div className='m-auto w-full flex justify-around'>
                    <div className='flex flex-wrap justify-center'>
                        {children}
                    </div>
                </div>
            </div>
            <div className='flex w-full'>
                hola
            </div>
        </div>
    )
})
