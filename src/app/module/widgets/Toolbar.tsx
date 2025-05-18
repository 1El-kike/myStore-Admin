import React from "react";
import { Button } from "./buttom";
import { StarRating } from "./startRating";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Tooltip } from "flowbite-react";
import { TypeStore } from "../../../interface/typestore";
import { port, PUBLIC_URL } from "../../../config/env";
import { Image } from "@nextui-org/react";

interface Type {
  element: string;
  action: string;
  info?: TypeStore;
}

export const Toolbar: React.FC<Type> = ({ element, action, info }) => {
  return (
    <>
      <div className="md:flex flex-col lg:flex-row animate-appearance-ins relative justify-between">
        {info && (
          <>
            <div className="absolute w-full overflow-hidden opacity-10 h-full">
              <div className="w-full top-0">
                <Image
                  isBlurred
                  className=""
                  width={"100%"}
                  alt="Album Cover"
                  src={port + info?.imgfondo}
                />
              </div>
            </div>
            <div>
              <div  className="absolute hidden lg:block bottom-0 animate-transition">
              <Image
                  isBlurred
                  className="-z-0"
                  width={"100%"}
                  alt="Album Cover"
                  src={`${PUBLIC_URL}products2.png`}
                />
              </div>
              <div  className="absolute hidden lg:block left-60 bottom-4 animate-transitionleft">
              <Image
                  isBlurred
                  className=""
                  width={"100%"}
                  alt="Album Cover"
                  src={`${PUBLIC_URL}products.png`}
                />
              </div>
             
            </div>
          </>
        )}
        <div className="w-full my-5 flex mx-4 md:w-[60%] xl:w-full xl:mx-20">
          <div className="w-24 h-[52px] flex">
            <Button />
          </div>
          <div className="leading-3 tracking-tight">
            <p>Back to {element}</p>
            <h1 className="text-3xl font-bold">{action}</h1>
          </div>
        </div>
        {info && (
          <div className="flex relative mb-14 mx-2 lg:mb-0 h-96  items-center w-full flex-col">
            <div className=" flex  mt-20 sm:mt-3 lg:mt-0 justify-center w-full">
              <div className="relative  left-full">
                <button
                  type="button"
                  className="cursor-pointer absolute right-6 top-6 bg-slate-900 p-2 rounded-full z-40 "
                >
                  <Link to={`/stores/${info.id}`}>
                    <FaPlus size={24} color="white" />
                  </Link>
                </button>
              </div>
              <div className="absolute bg-gradient-to-br blur from-transparent via-transparent to-purple-950 rounded-s-3xl w-lvw h-20 right-0 bottom-0"></div>
              <div className="absolute top-4 right-3 w-full h-4/5 rounded-lg overflow-hidden">
                <div className="w-full absolute h-full  bg-gradient-to-t via-white from-white to-transparent z-20"></div>
                <div className="aspect-auto w-full">
                  <Image
                  isBlurred
                  className=""
                  alt="Album Cover"
                  src={port + info.imgPortada}
                />
                  </div>
              </div>
              <div className="z-30 w-full">
                <div  className="absolute hidden md:flex justify-center items-center overflow-hidden  bg-gradient-to-tr from-violet-300 to-rose-300 -right-10 rounded-full shadow-2xl shadow-violet-950  -bottom-10 w-56 h-56 z-20 aspect-auto">
                <Image
                  isBlurred
                  className="scale-150 h-[150px]"
                  alt="Album Cover"
                  src={port + info.imgStore}
                />
                </div>
               
                <h1 className="z-30 text-6xl md:mt-16  line-clamp-1 mr-auto font-black text-slate-950">
                  {info.name}
                </h1>

                <p className="z-30 text-base w-2/3 text-justify my-2 text-slate-950 line-clamp-3">
                  {info.description}
                </p>

                <div className="flex w-4/5 md:w-3/5 my-2 justify-between">
                  <div>
                    <p>Address:</p>
                    <p className="z-30 text-sm font-bold text-slate-950 line-clamp-1 mt-auto">
                      {info.address}
                    </p>
                  </div>
                  <div>
                    <p>Email:</p>
                    <p className="z-30 text-sm font-bold text-slate-950 mt-auto">
                      {info.email}
                    </p>
                  </div>
                </div>
                <div className="flex w-3/5 items-center justify-between">
                  <div>
                    <p>Phone:</p>
                    <p className="z-30 text-sm font-bold text-slate-950 line-clamp-1 mt-auto">
                      {info.phone}
                    </p>
                  </div>
                  <div>
                    <div className="z-30 text-sm font-bold flex justify-center items-center text-slate-950 mt-auto">
                      <StarRating size={18} rating={info.rating as number} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
