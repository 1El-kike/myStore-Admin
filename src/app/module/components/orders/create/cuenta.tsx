import React, { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form';
import { updateTable } from '../../../core/filtertableandSearch';

interface TypeCuenta {
    datosModal:any;
    
}

export const Cuenta:React.FC<TypeCuenta> =({datosModal})=>{

  const { datosTable } = updateTable();



// Dentro de tu componente
const subtotal = useMemo(() => { 
    return datosTable.reduce((accumulator:any, item:any) => {
        // Verificar que price y quantity sean números válidos
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        return accumulator + (price * quantity);
    }, 0);
}, [datosModal,datosTable])
const { watch, getValues } = useFormContext();

const discount = useMemo(()=> {
const disc =  Number(getValues('discount')) || "-" ;
return disc;
},[watch('discount')])

const shipping = useMemo(()=> {
  const shipp =  Number(getValues('shipping')) || "-" ;
  return shipp;
  },[watch('shipping')])

  const taxes = useMemo(()=> {
    const price = Number(subtotal) || 0
    const taxRate  =  Number(getValues('taxrate')) || 0 ;
    const taxAmount = (price * taxRate) / 100 || "-";
    return taxAmount;
    },[watch('taxrate'),datosTable])

  const total = useMemo(()=> {
    const sub = Number(subtotal) || 0;
    const shi = Number(shipping) || 0;
    const dis = Number(discount) || 0;
    const tax = Number(taxes) || 0
    return sub - dis + shi + tax

  },[discount,shipping,subtotal,taxes])

    return <>
    <div className="flex relative justify-end mt-10">
    <div className="absolute blur-2xl -z-40 inset-0">
                    <div className={`w-full h-full opacity-30 bg-gradient-to-tl from-rose-500 to-violet-500 clip-modal `}></div>
                  </div>

    <div className="flex flex-col gap-5 w-1/2">

        <div className="flex justify-between w-full">
          <h1>Subtotal</h1>
          <h2> ${subtotal} </h2>
        </div>
        <div className="flex justify-between w-full">
          <h1>Discount</h1>
          <h2>{discount == "-" ? "-" : "$" + discount} </h2>
        </div>
        <div className="flex justify-between w-full">
          <h1>Shipping</h1>
          <h2>{shipping == "-" ? "-" : "$" + shipping} </h2>
        </div>
        <div className="flex justify-between w-full">
          <h1>Taxes</h1>
          <h2>{taxes == "-" ? "-" : "$" + taxes}</h2>
        </div>
        <div className="flex justify-between w-full">
          <h1 className="font-bold">Total</h1>
          <h2 className="font-bold">{total}</h2>
        </div>
    </div>
    </div>
    </>
  }

