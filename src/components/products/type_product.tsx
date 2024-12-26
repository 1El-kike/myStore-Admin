import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
interface TypeP {
  image: string;
  title: string;
  text: string;
  textsecondary: string;
  fondo: string;
  scale: string;
  button: string | undefined;
  idStore: number;
  position?: "horisontal"| "vertical";
  link:string;
}

export const Type_product = ({
  image,
  title,
  text,
  textsecondary,
  scale,
  button,
  fondo = "bg-rose-200",
  idStore,
  position = "horisontal",
  link,
}: TypeP) => {
  return (
    <Link to={`${link + idStore}`}>
      <div className="w-full  h-full transition-all hover:scale-105 ease-in-out duration-700 cursor-pointer mb-10">
        <div
          className={` w-full relative overflow-hidden  h-full shadow-2xl shadow-slate-500 text-slate-200 lg:flex  justify-between p-5 rounded-3xl ${fondo}`}
        >
          
            <div className={`rounded-2xl overflow-hidden flex h-full ${position == "vertical" ? "" : "w-[30%] "}`}>
              { position == "horisontal" ?
              <img
                className={` scale-${scale} justify-center aspect-square m-auto rounded-2xl `}
                src={image}
                alt="Title"
              />
              :
              <div className="absolute w-full h-full blur-sm">
              <img
              className={` h-full clip-edit  w-full bottom-0 z-10  opacity-50 aspect-auto scale-${scale} `}
              src={image}
              
              alt="Title"
              />
              </div>
              
            
            }
          
          </div>
          <div className={`ext-center z-20 ${position == "horisontal" ? "text-slate-600" : "text-slate-800"} `}>
            <h4 className="line-clamp-1 text-center  text-slate-950 font-bold text-2xl mb-4">
              {title}
            </h4>
            <p className="text-center line-clamp-3 leading-6 tracking-tighter font-semibold text-ellipsis mb-4 max-w-96">
              {text}
            </p>
            <p className=" text-xl font-semibold text-center  max-w-96">
              {textsecondary}
            </p>
          </div>
          <button
            className={`${button} z-20 p-3 flex justify-center items-center rounded-full mt-auto `}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </Link>
  );
};
