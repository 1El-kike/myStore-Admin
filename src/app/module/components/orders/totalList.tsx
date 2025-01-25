import React, { FC } from "react";
import { FaRegCheckSquare } from "react-icons/fa";
import {
  FaClipboardList,
  FaRegRectangleXmark,
  FaShopify,
} from "react-icons/fa6";

interface TypeList {
  active: number;
  complet: number;
  total: number;
  canceled: number;
}

export const TotalList: FC<TypeList> = ({
  active,
  complet,
  total,
  canceled,
}) => {
  const info = [
    [ total,"Total Orders" ,<FaShopify size={28} />],
    [ active,"Active Orders" ,<FaClipboardList size={28} />],
    [ complet,"Completed Orders", <FaRegCheckSquare size={28} />],
    [ canceled,"Canceled Orders", <FaRegRectangleXmark size={28} />],
  ];

  return (
    <>
      <div className="border flex flex-wrap justify-between items-center w-full rounded-xl shadow-lg shadow-gray-300 py-4 px-2 border-gray-300 ">
        {info.map((e: any) => (
          <>
            <div
              key={e[1]}
              className="grow w-[200px] flex justify-center items-center"
            >
              <div className="flex-col md:flex-row flex flex-wrap gap-4 justify-center border-r-1 w-full border-gray-400 items-center">
                <div className="bg-gradient-to-bl from-slate-200 to-rose-300 border-1  rounded-full p-2">
                 { e[2]}
                </div>
                <div className="">
                  <p className="text-xs line-clamp-1  md:text-base">
                   { e[1]}
                  </p>
                  <div className="font-extrabold text-xl relative text-rose-950 md:text-3xl">
                    {e[0] | 0}
                    <div className="blur-xl w-full h-full absolute top-1 -z-10">
                      <div className="absolute w-[200px] h-full bg-violet-500  clip-fondo "></div>
                    </div>
                    <div className="blur-xl w-full h-full absolute -top-7 right-64 -z-10">
                      <div className="absolute w-[200px] h-full bg-sky-400  clip-fondo "></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};
