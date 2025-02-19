import React from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import { PageTitleInit } from '../../module/layout/tollbar/tiltleInit'
import { PageTitle } from '../../module/core/pageTitle'
import { OrderList } from '../../module/components/orders/orderList'
import { OrderListEdit } from '../../module/components/orders/orderListEdit'
import { OrderCreate } from '../../module/components/orders/orderCreate'

export const OrderPage = () => {

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
