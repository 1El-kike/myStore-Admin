import React from 'react'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className='d-flex flex-column flex-column-fluid flex-lg-row bg-gradient-to-l h-100 from-blue-700 to-purple-500'>
    
      <img
        src="/pngtree-stunning-3d-render-of-a-modern-supermarket-image_13561321.png"
        className="h-[100%] shadow-red-600 w-full fixed"
        alt=""
      />
            <Outlet />
    </div>
  )
}
