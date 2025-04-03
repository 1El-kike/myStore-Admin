import React from 'react'
import { useLocation } from 'react-router-dom';
import { useEjecut } from '../../../../hooks/useEjecut';
import { PageTitleInit } from '../../../layout/tollbar/tiltleInit';
import { ProductAll } from '../edit/product';
import { Toolbar } from '../../../widgets/Toolbar';

export const WatchSelectProducts = () => {

  const location = useLocation();
      const { id } = location.state || {};
      const {
        data: items,
        errors,
        isLoadingData,
      } = useEjecut({ url: `productStore/store/${id}` });


  return (
    <>
   <PageTitleInit />
        <div className="w-full m-10">
               <div className="flex justify-center items-end flex-col w-[80%] ">
               {isLoadingData && <p>loading...</p>}
               {items && <ProductAll data={items} />}
               {errors && <p>error...</p>}
               </div>
             </div>
             <Toolbar action="Add Product" element="Admin of Product" />
    </>
  )
}
