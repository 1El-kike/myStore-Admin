import React, { useState } from "react";
import { FaLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { PUBLIC_URL } from "../../../../../config/env";
import { Image } from "@nextui-org/react";

export const AddStores = () => {
  const redirect = useNavigate();

  const [isEnter, setisEnter] = useState(false);

  return (
    <>
      <div className="relative w-full h-full">
        <div
          onMouseLeave={() => setisEnter(false)}
          onMouseEnter={() => setisEnter(true)}
          className={"w-full  flex items-center   h-full absolute"}
        >
          <div
            className={
              isEnter
                ? "scale-125 transition-all duration-300 translate-x-60 w-full absolute z-0  clip-addStore"
                : "w-full transition-all duration-300 z-0 absolute   clip-addStore"
            }
          >
            <Image
              isBlurred
              alt="Album Cover"
              src={`${PUBLIC_URL}CPA-Header-Image-2021-Careers.png`}
              width={"100%"}
            />
          </div>
          <div className="w-full ml-8 h-full flex-col flex md:gap-4 pt-4 md:justify-center items-start">
            <p className="uppercase text-white  text-xs md:text-base font-bold z-10">
              watch & Accessores
            </p>
            <h1 className="uppercase text-white text-sm md:text-5xl font-extrabold z-10">
              Add Stores Here
            </h1>
            <p className="mr-12 capitalize text-white text-xs md:text-sm text-wrap md:w-[50%] z-10">
              Lorem Khaled ipsuam is a major key to success. it is are you how
              you want to live you life
            </p>
            <div className=" flex justify-center gap-10 items-center">
              <button
                onClick={() => redirect("/stores/add")}
                className={`${
                  isEnter && "animate-pulse "
                } z-10 hover:scale-95 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2`}
              >
                Add + Stores
              </button>
              <FaLeftLong
                color="white"
                className={`${
                  !isEnter
                    ? "opacity-0 transition-all duration-100"
                    : "duration-500 animate-ping opacity-100"
                }`}
                size={56}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
