import { Avatar, Image } from '@nextui-org/react'
import React, { memo, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../../auth/core/Auth'
import { port } from '../../../../../config/env'
import { Box, Step, StepLabel, Stepper } from '@mui/material'

interface DetaillProps {
    datos: any
    customer: any;
}

export const DetaillOrder = ({ datos, customer }: DetaillProps) => {

    // Esto es provicionar hasta que se tenga la imagen de Customer

    const [data, setdata] = useState(datos)


    const steps = [
        {
            label: 'Select campaign settings',
        },
        {
            label: 'Create an ad group',
        },
        {
            label: 'Create an ad',
        }
    ];


    return (
        <div className='w-full  pl-5 md:pl-0 flex-wrap mt-5 flex justify-between h-full inset-0'>
            <div className='flex md:w-1/2  my-5 w-full'>
                <div className='w-full flex  justify-around'>
                    <div className='flex flex-col  w-full  flex-wrap  justify-start'>
                        <h1 className='flex ml-10 border-b-1 pb-4 text-lg font-semibold gap-3 items-center'>
                            <span><FaUser /></span>Products more Details</h1>
                        {data?.flatMap((e: any) => e?.items.map((elem: any, index: number) => {

                            return (
                                <div key={elem.storeName + index} className='flex flex-col hover:scale-110 duration-400 hover:translate-x-6 lg:flex-row mt-5 justify-start items-start gap-5 md:ml-10'>

                                    <Image
                                        isBlurred
                                        alt="Album Cover"
                                        className='min-w-20'
                                        src={`${port}${elem?.productImage}`}
                                        width={80}
                                        height={80}
                                    />
                                    <div className=' lg:w-full w-[70%]'>
                                        <p className="text-sm font-medium">{elem?.productName}</p>
                                        <p className="text-sm max-w-96 line-clamp-3">{elem?.productDescription}</p>
                                        <div className='flex gap-5 mt-4 flex-wrap'>
                                            <div className=' flex items-center  gap-2 '>
                                                <p className="text-xs text-gray-500">Store:</p>
                                                <p className="text-xs">{elem?.storeName}</p>
                                            </div>
                                            <div className=' flex gap-2 '>
                                                <p className="text-xs text-gray-500">Price:</p>
                                                <p className="text-xs text-gray-500"> ${elem?.price}</p>
                                            </div>
                                            <div className='flex gap-5'>
                                                <p className="text-xs text-gray-500">Quantity:</p>
                                                <p className="text-xs text-gray-500">{elem?.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )

                        }))}
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap  text-sm justify-around md:w-1/2 w-full'>
                <div className='flex flex-col  w-full min-w-48 gap-2 xl:w-1/3'>
                    <h1 className='flex text-lg font-semibold gap-3 items-center'>
                        <span><FaUser /></span>Customer Details</h1>
                    <div className=''>

                        <p className='text-gray-500 '>
                            NAME
                        </p>
                        <p className='font-semibold text-base'>{customer?.name}</p>
                    </div>
                    <div className=''>
                        <p className='text-gray-500 '>
                            E - MAIL
                        </p>
                        <p className='font-semibold text-base'> mail@pagedone.com{/* {customer } */}</p>
                    </div>
                    <div className=''>
                        <p className='text-gray-500 '>
                            PHONE NUMBER
                        </p>
                        <p className='font-semibold text-base'>{customer?.phone}</p>
                    </div>
                </div>
                <div className='xl:w-[50%] w-full  min-w-60 flex flex-col gap-2 justify-center items-center'>
                    <Avatar
                        isBordered
                        className="w-20 h-20 mt-5 text-large"
                        src={port + customer?.image}
                    />
                    <div className='grow w-full pl-5'>
                        <div className='mt-5  mr-auto'>
                            <p className='text-gray-500 '>
                                HISTORY
                            </p>
                            <Box sx={{ maxWidth: 400 }}>
                                <Stepper activeStep={2} orientation="vertical">
                                    {steps.map((step, index) => (
                                        <Step key={step?.label + index}>
                                            <StepLabel    >
                                                {step?.label}
                                            </StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
