import React from 'react'
import { FormAuth } from '../FormAuth'

export const Registration = () => {
  return (
     <>
          <div className=" w-full relative">      
            <FormAuth
              first_input="name"
              second_input="iphone"
              three_input="password"
              number_input="tarjet"
              input5="Role"
            />
          </div>
        </>
  )
}
