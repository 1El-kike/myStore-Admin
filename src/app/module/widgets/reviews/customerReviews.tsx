import React from 'react'
import { useEjecut } from '../../../hooks/useEjecut';

export const CustomerReviews = ({productId}:{productId:string}) => {


     const {
        data: reviewData,
        errors,
        isLoadingData,
      } = useEjecut({ url: `review/product/${productId}` });

      console.log(reviewData)

  return (
    <div>C</div>
  )
}
