import React from 'react'
import { PageTitleInit } from '../../layout/tollbar/tiltleInit'
import { useEjecut } from '../../../hooks/useEjecut';
import { useParams } from 'react-router-dom';

export const OrderListEdit = () => {

    const params = useParams()
    const { data } = useEjecut({ url: `orders/summary/${params.id}` });
  
  const ProductDetail =()=> {
    return (
      <>

      </>
    )
  }

  return (

    <>
      <PageTitleInit />
      <div className='flex'>
        <ProductDetail/>
      </div>
    </>
  )
}
