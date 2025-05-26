import React, { useEffect, useState } from 'react'
import { PageTitleInit } from '../../../layout/tollbar/tiltleInit'
import { useEjecut } from '../../../../hooks/useEjecut';
import { useParams } from 'react-router-dom';
import OrderLifecycleController, { Order } from './OrderLifecycleProps';
import axios from 'axios';
import { Image, Spinner } from '@nextui-org/react';
import { port } from '../../../../../config/env';
import { DetaillOrder } from './detaillOrder';

export const OrderListEdit = () => {

  const params = useParams()
  const { data, errors, isLoadingData } = useEjecut({ url: `orders/summary/${params.id}` });
  const [loading, setloading] = useState(false)

  console.log(data, `${port}uploads/${data?.productImage}`)

  const onStatusChange = (id: string, newStatus: string) => {
    setloading(true)
    try {
      axios.put(port + 'orders/update', { orderId: id, status: newStatus })
      setloading(false)
    } catch (error) {
      setloading(false)
      console.log(error)
    }

  }

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
              <div className={`duration-250 m-auto ${loading ? ' ' : ''}`}>
                {
                  loading &&
                  (
                    <Spinner
                      labelColor="danger"
                      color="danger" /* label="Loading..." */
                    />
                  )
                }
                <div className='w-full h-36 -z-10 absolute  bg-gradient-to-tr from-violet-300/50 to-teal-400/50 inset-0'>

                </div>
                <OrderLifecycleController order={data} onStatusChange={onStatusChange} />
              </div>
        }
        <DetaillOrder >
          {data?.items.map((elem: any) =>
          (
            <div className='flex justify-start gap-5 ml-10'>

              <Image
                isBlurred
                alt="Album Cover"
                className='min-w-20'
                src={`${port}${elem.productImage}`}
                width={80}
                height={80}
              />
              <div>
                <p className="text-sm font-medium">{elem.productName}</p>
                <p className="text-sm">{elem?.productDescription}</p>
                <p className="text-xs text-gray-500"></p>
              </div>
            </div>
          )

          )}
          <div>

          </div>
        </DetaillOrder>
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
