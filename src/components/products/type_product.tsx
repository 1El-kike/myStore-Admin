import React from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
interface TypeP{
    image:string
    title:string
    text:string
    textsecondary:string
    fondo:string
    scale:string
    button:string
}

export const Type_product = ({image,title,text,textsecondary,scale,button, fondo = 'bg-rose-200'}:TypeP) => {
  return (
    <Link to={'/products/add'}>
    <div className='w-full transition-all hover:scale-105 ease-in-out duration-700 cursor-pointer mb-10'>
        <div
            className= {`card w-full shadow-2xl shadow-slate-500 text-slate-200 lg:flex  justify-between p-5 rounded-3xl ${fondo}`}
        >
            <div className='w-56 rounded-2xl mr-5 overflow-clip h-56'>
            <img className={`w-56 scale-${scale}  h-56 m-auto rounded-2xl`} src={image} alt="Title" />
            </div>
            <div className="card-body text-justify text-slate-500">
                <h4 className="card-title text-slate-950 font-bold text-2xl mb-4">{title}</h4>
                <p className="card-text text-justify line-clamp-6 leading-6 tracking-tighter font-semibold text-ellipsis mb-4 max-w-96">{text}</p>
                <p className="card-text text-xl text mt-10 -ellipsis max-w-96">{textsecondary}</p>
            </div>
            <button className={`${button} w-10 h-10 flex justify-center items-center rounded-full mt-auto `}><FaAngleRight /></button>
        </div>
        
    </div>
    </Link>

  )
}
