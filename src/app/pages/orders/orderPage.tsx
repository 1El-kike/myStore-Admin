import React, { useEffect } from 'react'
import { Navigate, Route, Router, Routes, useLocation } from 'react-router-dom'
import { PageTitleInit } from '../../module/layout/tollbar/tiltleInit'
import { PageTitle } from '../../module/core/pageTitle'
import { OrderList } from '../../module/components/orders/orderList'
import { OrderListEdit } from '../../module/components/orders/orderListEdit'
import { OrderCreate } from '../../module/components/orders/create/orderCreate'
import { updateTable } from '../../module/core/filtertableandSearch'

export const OrderPage = () => {
  const location = useLocation();
  const { setdatosTable } = updateTable();
  
  useEffect(() => {
    // Resetear al cambiar de ruta
    setdatosTable([]);
  }, [location.pathname]);

const listOrder = [
    {
        title: "Beginning",
        path: "",
        isSeparator: false,
        isActive: false,
      },
      {
        title: "",
        path: "",
        isSeparator: true,
        isActive: false,
      },
]
const listOrderEdit = [
  {
      title: "Beginning",
      path: "/orders/list",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Edit",
      path: "",
      isSeparator: true,
      isActive: false,
    },
]

  return (
    <Routes>
        <Route
        path='list/*'
        element={
            <>
           <PageTitle breadcrumbs={listOrder}>Orders</PageTitle>
           <OrderList/>
            </>
        }
        />
        <Route
        path='create/*'
        element={
            <>
           <PageTitle breadcrumbs={listOrder}>Create orders</PageTitle>
           <OrderCreate/>
            </>
        }
        />
         <Route
        path='list/edit/:id'
        element={
            <>
           <PageTitle breadcrumbs={listOrderEdit}>Edit</PageTitle>
           <OrderListEdit/>
            </>
        }
        />
        <Route index element={<Navigate to="list"/>}/>
    </Routes>
  )
}
