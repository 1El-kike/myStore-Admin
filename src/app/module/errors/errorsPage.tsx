import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ErrorsPage = () => {

const navigate = useNavigate();

const handleBack = ()=>{
  navigate(-2)
}

  return (
    <div onClick={handleBack}>errorsPage click here</div>
  )
}
