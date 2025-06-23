import React, { useEffect, useState } from 'react'
import { PageTitleInit } from '../../../layout/tollbar/tiltleInit'
import { useEjecut } from '../../../../hooks/useEjecut';
import { useParams } from 'react-router-dom';
import OrderLifecycleController, { OrderStatus } from './OrderLifecycleProps';
import axios from 'axios';
import { Image, Spinner } from '@nextui-org/react';
import { port } from '../../../../../config/env';
import { DetaillOrder } from './detaillOrder';
import CustomizedSteppers from '../../../widgets/Stepper';
import { FaBox } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { OrderTrackingMap } from './OrderTrackingMap ';

export const OrderListEdit = () => {


  // En tu componente padre
  const statusSequence: OrderStatus[] = [
    'PENDING',
    'ACCEPTED',
    'PROCESSING',
    'DELIVERING',
    'DELIVERED'
  ];
  const params = useParams()
  const { data, errors, isLoadingData } = useEjecut({ url: `orders/summary/${params.id}` });
  const [loading, setloading] = useState(false)
  const [datos, setdatos] = useState(data)
  const [activeStep, setActiveStep] = React.useState(0);

  // Función para actualizar el estado del pedido en el padre
  const updateOrderStatus = (storeOrderStatus: OrderStatus, globalStatus: OrderStatus, id: string) => {
    setdatos((prevData: any) => {
      // Actualizar correctamente el estado de las tiendas
      const updatedStoreOrders = prevData.storeOrders.map((storeOrder: any) =>
        storeOrder.id === id ? { ...storeOrder, status: storeOrderStatus } : storeOrder
      );

      return {
        ...prevData,
        globalStatus: globalStatus,
        storeOrders: updatedStoreOrders
      };
    });
  };

  useEffect(() => {
    if (data) {
      setdatos(data)
      const newActiveStep = statusSequence.indexOf(data?.globalStatus);
      setActiveStep(newActiveStep);
    }
  }, [data])

  //console.log(datos)
  const onStatusChange = async (id: string, newStatus: OrderStatus) => {

    setloading(true)
    try {
      const dataOrder = await axios.put(port + 'orders/update', { storeOrderId: id, status: newStatus })
      updateOrderStatus(dataOrder.data.storeOrderStatus, dataOrder.data.globalStatus, id)
      // Calcular nuevo paso activo basado en secuencia
      const newActiveStep = statusSequence.indexOf(dataOrder.data.globalStatus);
      setActiveStep(newActiveStep);
      setloading(false)
    } catch (error) {
      setloading(false)
      console.log(error)
    }
  }


  const adress = new Set()
  datos?.storeOrders.map((e: any) => e.items.map((x: any) => adress?.add(x.Store.address)))

  const ProductDetail = () => {
    return (
      <div className='w-full relative flex flex-col h-full'>
        {
          errors
            ?
            <p>Error..</p>
            :
            isLoadingData ?
              (<Spinner
                className='m-auto h-screen'
                labelColor="danger"
                color="danger" /* label="Loading..." */
              />) :
              <div className={`duration-250 pl-5 md:pl-0 ${loading ? ' ' : ''}`}>
                <div className='w-full mt-4 flex md:justify-center justify-start items-center h-auto md:h-36 md:-z-10 md:absolute relative  bg-gradient-to-tr from-violet-200/50 to-teal-100/50 '>
                  <CustomizedSteppers activeStep={activeStep} />
                </div>
                <div className='flex flex-wrap gap-6 mx-1 md:mx-5'>
                  <div className='flex gap-8 flex-wrap grow justify-around md:ml-auto mt-2 md:mt-44'>
                    <div className='flex w-full lg:w-auto text-sm flex-col gap-2'>
                      <h1 className='flex text-lg font-semibold gap-3 items-center'>
                        <span><FaBox /></span>Order Information</h1>
                      <div className=''>
                        <p className='text-gray-500 '>
                          PICKUP DATE
                        </p>
                        <p className='font-semibold text-base'>{datos?.createdAt}</p>
                      </div>
                      <div className=''>
                        <p className='text-gray-500'>
                          ESTIMATE DRCP
                        </p>
                        <p className='font-semibold text-base'> 8 Days {/* TENGO QUE PONER UNA API AQUIO */}</p>
                      </div>
                      <div className=''>
                        <p className='text-gray-500'>
                          RETURN AVALIABLE TIME
                        </p>
                        <p className='font-semibold text-base'> 7 Days {/* TENGO QUE PONER UNA API AQUIO */}</p>
                      </div>
                    </div>
                    <div className='flex w-full lg:w-auto lg:max-w-72 text-sm flex-col gap-2'>
                      <h1 className='flex text-lg font-semibold gap-3 items-center'>
                        <span><FaLocationDot /></span>Locations</h1>
                      <div className=''>
                        <p className='text-gray-500'> PICKUP LOCATIONS</p>
                        <span className=' font-semibold text-base'>
                          {/* Crear API aqui Lugar de recogida */}
                          {
                            [...adress]?.map((pickup: any, index: number) => (
                              <div key={index}>
                                <p className='font-normal text-rose-700'>Address - {index + 1}</p>
                                <p>{pickup}</p>
                              </div>
                            ))
                          }
                        </span>
                      </div>
                      <div className=''>
                        <p className='text-gray-500'> DROPOFT LOCATIONS</p>
                        <span className=' font-semibold text-base'>
                          {/* Crear API aqui Lugar de recogida */}
                          <p>{datos?.city}</p>
                          <p>{datos?.destination}</p>
                        </span>
                      </div>
                    </div>
                  </div>
                  <OrderLifecycleController order={datos} onStatusChange={onStatusChange} >
                    {
                      loading &&
                      (
                        <Spinner
                          labelColor="danger"
                          color="danger" /* label="Loading..." */
                        />
                      )
                    }
                  </OrderLifecycleController>
                </div>
              </div>
        }
        <DetaillOrder customer={datos?.customer} datos={datos?.storeOrders} />
        <div className='w-full flex justify-center mb-10 mt-10'>
          <div className='w-[90%]'>
            <OrderTrackingMap storeOrderId={datos?.id} />
          </div>
        </div>
      </div>
    )
  }

  return (

    <>
      <PageTitleInit />
      <div className='flex w-full'>
        <ProductDetail />
      </div>
    </>
  )
}
