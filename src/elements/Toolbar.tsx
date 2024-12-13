import React from "react";
import { Button } from "./buttom";
import { TypeStore } from "../interface/typestore";
import { port } from "../config/env";
import { StarRating } from "./startRating";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Tooltip } from "flowbite-react";

interface Type {
  element: string;
  action: string;
  info?: TypeStore;
}

export const Toolbar: React.FC<Type> = ({ element, action, info }) => {
  return (
    <>
      <div className="md:flex relative justify-between">
        {info && (
          <>
            <div className="absolute w-full overflow-hidden opacity-10 h-full">
              <img src={port + info?.imgfondo} className="w-full " alt="" />
            </div>
            <div>
              <img
                src="/products2.png"
                className="absolute bottom-0 animate-transition"
                alt=""
              />
              <img
                src="/products.png"
                className="absolute left-60 bottom-4 animate-transitionleft"
                alt=""
              />
            </div>
          </>
        )}
        <div className="w-full my-5 flex mx-4 md:mx-20">
          <div className="w-24 h-[52px] flex">
            <Button />
          </div>
          <div className="leading-3 tracking-tight">
            <p>Back to {element}</p>
            <h1 className="text-3xl font-bold">{action}</h1>
          </div>
        </div>
        {info && (
          <div className="flex relative h-96  items-center w-full flex-col">
            <div className=" flex justify-center w-full">
              <div className="relative left-full">
                <button
                  type="button"
                  className="cursor-pointer absolute right-6 top-6 bg-slate-900 p-2 rounded-full z-40 "
                >
                  <Link to={`/stores/${info.id}`}>
                    <FaPlus size={24} color="white" />
                  </Link>
                </button>
              </div>
              <div className="absolute bg-gradient-to-br from-transparent via-transparent to-purple-950 rounded-s-3xl w-lvw h-20 right-0 bottom-0"></div>
              <div className="absolute top-4 right-3 w-full h-4/5 rounded-lg overflow-hidden">
                <div className="w-full absolute h-full  bg-gradient-to-t via-white from-white to-transparent z-10"></div>
                <img
                  src={port + info.imgPortada}
                  className=" aspect-auto w-full"
                  alt=""
                />
              </div>
              <div className="z-30 w-full">
                <img
                  src={port + info.imgStore}
                  className="absolute  -right-10 rounded-full shadow-2xl shadow-violet-950 -bottom-10 w-56 h-56 z-20 aspect-auto"
                  alt=""
                />
                <h1 className="z-30 text-6xl mt-16 line-clamp-1 mr-auto font-black text-slate-950">
                  {info.name}
                </h1>

                <p className="z-30 text-base w-2/3 text-justify my-2 text-slate-950 line-clamp-3">
                  {info.description}
                </p>

                <div className="flex w-3/5 my-2 justify-between">
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
                      <StarRating rating={info.rating} />
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
