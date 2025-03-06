import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className='d-flex bg-gradient-to-l from-blue-700 to-purple-500 flex-column flex-lg-row flex-column-fluid h-100'>
      <img
        src="/pngtree-stunning-3d-render-of-a-modern-supermarket-image_13561321.png"
        className="fixed  w-full h-[100%]    shadow-red-600"
        alt=""
      />
            <Outlet />
    </div>
  )
}
