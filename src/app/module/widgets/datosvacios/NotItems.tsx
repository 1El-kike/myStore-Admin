import React, { useState } from 'react'
import { FaStore } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/core/Auth';

interface TypeNotItem {
  Icon: any;
  text: string;
  link: string;
  role: string[];
  next: string;
}

export const NotItems: React.FC<TypeNotItem> = ({ Icon, text, link, role, next }) => {

  const [effect, seteffect] = useState(false)
  const [effect_secound, seteffectSecound] = useState(false)
  const { currentUser } = useAuth();

  const handleEffectHover = () => {
    seteffectSecound(false)
  }
  const handleEffectHoverS = () => {
    seteffectSecound(true)
  }

  const handleEffectHoverE = () => {
    seteffect(true)
  }
  const handleEffectHoverL = () => {
    seteffect(false)
  }
  return (
    <div onMouseLeave={handleEffectHoverL} onMouseEnter={handleEffectHoverE} className='w-full box-content relative bg-gradient-to-tr from-violet-50 border via-rose-50 rounded-xl h-auto py-10 flex flex-col justify-center items-center'>
      <div className='border-2  border-dashed rounded-lg flex flex-col justify-center items-center mx-4 lg:mx-20 py-1'>
        <Icon className={`bg-gradient-to-tr text-slate-400  text-5xl  lg:text-9xl ${effect && 'animate-pulse'}`} />
        <div
          className="fixed inset-x-0 -z-20 h-[79%]  transform-gpu overflow-hidden blur-xl"
          aria-hidden="true"
        >
          <div className="relative clip-path  -z-10 aspect-[1155/478] -translate-x-12 rotate-[40deg] bg-gradient-to-tr from-[#ee48dd] opacity-10 to-[#e7087b]  sm:left-[calc(80%-40rem)] sm:w-[102.1875rem]"></div>
        </div>
        <p className="lg:text-2xl lg:w-1/2 text-center font-bold bg-gradient-to-tr from-slate-400 bg-clip-text text-transparent to-rose-200">
          {role?.includes(currentUser?.role as string) ? text + " " + next : text}</p>

        <div onMouseLeave={handleEffectHover} onMouseEnter={handleEffectHoverS}>
          {
            role?.includes(currentUser?.role as string) &&
            <button className={` mt-7 text-white bg-gradient-to-br from-purple-600 to-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  ${effect && effect_secound == false ? 'bg-gradient-to-bl ring-4 outline-none ring-blue-300 animate-bounce' : effect && effect_secound == false && 'hover:animate-none'}`}><Link to={link}>Click here</Link></button>

          }
        </div>
      </div>
    </div>
  )
}
