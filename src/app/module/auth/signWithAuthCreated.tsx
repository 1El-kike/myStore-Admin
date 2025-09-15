import React from 'react'
import { FaDiscord, FaGoogle } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export const SignWithAuthCreated = ({ link, title, sign }: { link: string, title: string, sign: string }) => {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold">{title}</h1>

      <div className="flex my-7 gap-4 flex-col">
        <button type='button' className="border flex justify-center items-center gap-3 border-slate-200 rounded-3xl py-2 hover:bg-white hover:text-slate-900 transition-all duration-400">
          {" "}
          <span>Continue with Google </span> <FaGoogle />
        </button>
        <button type='button' className="border flex justify-center items-center gap-3 border-slate-200 rounded-3xl py-2 hover:bg-white hover:text-slate-900 transition-all duration-400">
          <span> Continue with Discord </span>
          <FaDiscord />
        </button>
      </div>
      <div className="my-8">
        <div className="flex">
          <div className="relative w-10 bg-black m-auto">
            <span className="absolute -mt-[13px] font-bold text-base px-2 backdrop-blur-lg bg-black rounded ">
              or
            </span>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

