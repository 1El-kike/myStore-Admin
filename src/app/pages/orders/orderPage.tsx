import React from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import { PageTitleInit } from '../../module/layout/tollbar/tiltleInit'
import { PageTitle } from '../../module/core/pageTitle'
import { OrderList } from '../../module/components/orders/orderList'

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
        <Route index element={<Navigate to="list"/>}/>
    </Routes>
  )
}
