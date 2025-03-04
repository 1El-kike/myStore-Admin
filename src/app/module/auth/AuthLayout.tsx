import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
            <Outlet />
    </div>
  )
}
