import React from "react";
import { PageTitleInit } from "../../module/layout/tollbar/tiltleInit";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { FcImport, FcNext } from "react-icons/fc";
import { PUBLIC_URL } from "../../../config/env";
import { Image } from "@nextui-org/react";

export const ProductMain = () => {
  const AddProducts = () => {
    return (
      <>
        <div className="lg:w-[45%] md:w-full  grow">
          <Link to={"/products/add"}>
            <div className=" border relative overflow-hidden bg-gradient-to-r shadow-teal-800 shadow-2xl from-teal-400 via-teal-500 to-rose-600 border-gray-300 rounded-xl h-44 flex justify-start items-center">
              <div className="w-full hover:scale-110 hover:opacity-70 duration-400 scale-125 absolute">
                <Image
                  isBlurred
                  alt="Album Cover"
                  className=""
                  src={`${PUBLIC_URL}product/product-Photoroom.png`}
                  width={"100%"}
                />
              </div>

              <div className="pl-2 uppercase flex items-center gap-2 flex-col">
                <h1 className="text-base md:text-xl xl:text-2xl lg:text-base md:w-full lg:w-28 xl:w-48 text-center  font-extrabold text-white">
                  Add Product Here
                </h1>
                <FaPlusCircle
                  color="white"
                  className="animate-pulse"
                  size={42}
                />
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  };
  const DeliteProducts = () => {
    return (
      <>
        <div className="grow">
          <Link to={"/products/delite"}>
            <div className=" shadow-teal-800 mt-4 shadow-2xl border overflow-hidden border-gray-300  rounded-xl flex ">
              <div className="w-full hover:scale-110 duration-400">
                <Image
                  isBlurred
                  alt="Album Cover"
                  className=""
                  src={`${PUBLIC_URL}product/deleteProduct.png`}
                  width={"100%"}
                />
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  };
  const EditProducts = () => {
    return (
      <>
        <div className="lg:w-[45%] md:w-full   grow">
          <Link to={"/products/select"}>
            <div className="bg-gradient-to-l  shadow-teal-800 shadow-2xl relative from-violet-500 via-violet-600 to-violet-400 border overflow-hidden border-gray-300 rounded-xl h-44 flex ">
              <div className="aspect-video absolute hover:-translate-y-5 duration-400  scale-125 mt-24">
                <Image
                  isBlurred
                  alt="Album Cover"
                  className=""
                  src={`${PUBLIC_URL}products.png`}
                  width={"100%"}
                />
              </div>
              <div className="pl-3 uppercase flex  gap-2 ">
                <h1 className="text-2xl mt-7 text-center  font-extrabold  text-white">
                  Edit Product
                </h1>
                <FcImport className="mt-5 -rotate-90" size={42} />
              </div>
            </div>
          </Link>
        </div>
      </>
    );
  };

  const ListProducts = () => {
    return (
      <>
        <div className=" xl:h-[490px] md:w-full grow">
          <div className=" border relative  shadow-teal-800 shadow-2xl overflow-hidden  border-gray-300 rounded-xl flex justify-center items-center h-full">
            <div
              className="absolute top-0 left-0 scale-125 h-auto "
            >
              <Image
                isBlurred
                alt="Album Cover"
                className=""
                src={`${PUBLIC_URL}product/productList.jpg`}
              />
            </div>
            <div className="w-full h-full absolute bg-gradient-to-l from-violet-500 to-rose-500  opacity-80 clip-path"></div>
            <div className="rounded-3xl uppercase duration-400 hover:scale-110 backdrop-blur-md my-10 z-30 w-[60%] pb-10">
              <Link to={"/products/watch"}>
                <div className="text-transparent bg-gradient-to-tr from-white bg-clip-text via-slate-300 to-yellow-300  w-full h-full flex items-center flex-col justify-start pl-3 pr-3 pt-3 rounded-3xl gap-6 bg-opacity-40 font-extrabold text-base sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl">
                  Watch Products here
                  <div className="border rounded-2xl px-2 py-1 mr-3">
                    <p className="text-sm md:text-base capitalize font-normal">
                      only to see the products available to the administrator
                      associated with your stores{" "}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <PageTitleInit />
      <div className="flex md:flex-col lg:flex-row flex-wrap w-full justify-center items-center">
        <div className="grow w-full lg:w-[50%] gap-5 p-10 flex flex-col md:flex-row flex-wrap animate-opacityonly">
          <AddProducts />
          <EditProducts />
          <DeliteProducts />
        </div>
        <div className="grow w-full lg:w-[50%] gap-5 p-10 flex flex-col md:flex-row flex-wrap animate-appearance-in">
          <ListProducts />
        </div>
      </div>
    </>
  );
};
