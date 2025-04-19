import { Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaAngleRight, FaAppStore, FaStore } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
interface TypeP {
  image: string;
  title: string;
  text: string;
  textsecondary: string;
  fondo: string;
  scale: string;
  button: string | undefined;
  idStore: number;
  position?: "horisontal" | "vertical";
  link?: string;
  notID?: boolean;
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
  notID,
}: TypeP) => {
  const [links, setlinks] = useState(link);

  useEffect(() => {
    setlinks(link);
  }, [link]);

  const navigate = useNavigate();

  const handleToRouter = () => {
    if (notID) {
      navigate(`${links}`, { state: { id: idStore } });
    } else {
      links ? navigate(`${links}${idStore}`) : "";
    }
  };

  return (
    <div onClick={handleToRouter}>
      <div className="w-full h-full transition-all hover:scale-105 ease-in-out duration-700 cursor-pointer mb-10">
        <div
          className={` w-full relative overflow-hidden  h-full shadow-2xl shadow-slate-500 text-slate-200 lg:flex p-5 rounded-3xl ${fondo}`}
        >
          <div
            className={`rounded-2xl overflow-hidden flex  h-full ${
              position == "vertical" ? "" : " justify-center bg-gradient-to-tr from-rose-100 to-violet-100"
            }`}
          >
            {position == "horisontal" ? (
              <Image
                isBlurred
                alt="Album Cover"
              
                className="scale-105 justify-center w-full aspect-square m-auto rounded-2xl"
                src={image}
                width={240}
              />
            ) : (
              <div className="absolute w-full h-full blur-sm">
                <img
                  className={` h-full clip-edit  w-full bottom-0 z-10  opacity-50 aspect-auto scale-${scale} `}
                  src={image}
                  alt="Title"
                />
              </div>
            )}
          </div>
          <div
            className={`text-center m-auto justify-center  z-20 ${
              position == "horisontal"
                ? "text-slate-600"
                : "text-slate-800 h-52"
            } `}
          >
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
            className={`${button} z-20 absolute bottom-2 right-2 p-3 flex justify-center items-center rounded-full mt-auto `}
          >
            <FaAngleRight />
          </button>
        </div>
        <div
          className={
            "absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10 "
          }
        >
          <div className={" p-4 text-white rounded-2xl " + button}>
            <FaStore size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};
