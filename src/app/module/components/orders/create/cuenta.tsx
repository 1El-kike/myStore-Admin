import React, { useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form';
import { updateTable } from '../../../core/filtertableandSearch';
import { Cuenta } from '../../../widgets/Cuenta';

interface TypeCuenta {
  datosModal: any;

}

export const CuentaCreateOrder: React.FC<TypeCuenta> = ({ datosModal }) => {

  const { datosTable } = updateTable();


  // Dentro de tu componente
  let subtotal = useMemo(() => {
    return datosTable?.reduce((accumulator: any, item: any) => {
      // Verificar que price y quantity sean números válidos
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return accumulator + (price * quantity);
    }, 0);
  }, [datosModal, datosTable])

  if (subtotal == undefined) subtotal = 0
  const { watch, getValues } = useFormContext();

  const discount = useMemo(() => {
    const disc = Number(getValues('discount')) || "-";
    return disc;
  }, [watch('discount')])

  const shipping = useMemo(() => {
    const shipp = Number(getValues('shipping')) || "-";
    return shipp;
  }, [watch('shipping')])

  const taxes = useMemo(() => {
    const price = Number(subtotal) || 0
    const taxRate = Number(getValues('taxrate')) || datosModal?.taxrate || 0;
    const taxAmount = (price * taxRate) / 100 || "-";
    return taxAmount;
  }, [watch('taxrate'), datosTable, datosModal])

  const total = useMemo(() => {
    const sub = Number(subtotal) || 0;
    const shi = Number(shipping) || 0;
    const dis = Number(discount) || 0;
    const tax = Number(taxes) || 0
    return sub - dis + shi + tax

  }, [discount, shipping, subtotal, taxes])

  return <>
    <Cuenta
      discount={discount}
      shipping={shipping}
      subtotal={subtotal}
      taxes={taxes}
      total={total} />
  </>
}

