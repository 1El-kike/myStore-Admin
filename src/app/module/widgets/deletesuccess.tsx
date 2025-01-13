import React, {  useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { StarRating } from './startRating';
import { FaCircleXmark } from 'react-icons/fa6';
import { port } from '../../../config/env';

export const Deletesuccess = () => {
   
  
    const location = useLocation();
    const { datos } = location.state || {}; 
    const [data, setdata] = useState(datos)
    const [image, setimage] = useState(null)

    const {message, deliteData} = data
   

  return (
    <div className='relative bg-gradient-to-b from-rose-200 to-transparent'>
    <h1 className='text-3xl p-10 text-rose-900 font-extrabold flex justify-center items-center  gap-3'>{message} <FaCircleXmark size={28}/></h1>
    <p className='text-2xl p-10 text-rose-950 font-bold'>Details :</p>
    <div className='mx-10'>

    {Object.keys(deliteData).length > 0 ? (
                <div className='flex flex-wrap justify-around gap-10'>
                    {Object.keys(deliteData).map((key) => (
                        deliteData[key] == deliteData.rating ?
                    <span className='flex items-center'>  Rating:  <StarRating size={18} rating={deliteData.rating} /> </span>
                          :
                          typeof deliteData[key] === 'string' && deliteData[key].includes('uploads')
                          ?
                        
                          <img className='w-40 first:absolute' src={port + deliteData[key]}></img>
                          :
                        <div key={key}>
                            <strong className=' capitalize'></strong> {deliteData[key] !== undefined ? deliteData[key].toString() : 'N/A'}
                        </div>
                    ))}
                   
                </div>
            ) : (
                <p>No hay datos disponibles.</p>
            )}
    </div>
</div>
  )
}
