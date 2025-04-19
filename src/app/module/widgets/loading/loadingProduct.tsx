import { Skeleton, Spinner } from "@nextui-org/react";
import React from "react";

export const LoadingProduct = () => {
  const Product = () => {
    return (
      <div className="w-full transition-transform">
        <div className="p-2 m-3 rounded-2xl relative flex md:flex-row flex-col gap-4 bg-gradient-to-tr from-violet-100/40 to-rose-100/40">
        <div className="relative min-w-44">
        <Skeleton className="rounded-xl  w-full lg:w-48 h-40" >

        </Skeleton>
            <Spinner
            className="absolute left-[40%] top-[40%]"
              labelColor="danger"
              color="danger" /* label="Loading..." */
            />

            </div>

          <div className="flex flex-wrap justify-between w-full">
            <div className="w-full min-w-44 md:w-[50%] lg:w-[70%]">
            <Skeleton className="rounded-md w-[40%] ml-3 mt-1 mb-7 h-6" />
            <div className="ml-6 flex flex-col justify-center items-center">
            <Skeleton className="rounded-md w-[96%] h-4 mb-2" />
            <Skeleton className="rounded-md w-[80%] h-4 mb-2" />
            <Skeleton className="rounded-md w-[72%] h-4 mb-2" />
            </div>
            </div>

            <div className="flex w-full md:w-[100%] lg:w-[30%] justify-between items-start">
              <div className="w-full">
            <Skeleton className="rounded-md w-[59%] mt-1 mb-4 h-6" />
            <Skeleton className="rounded-md w-[74%]  mb-3 h-5" />
            <Skeleton className="rounded-md w-[70%] mb-3 h-5" />
            <Skeleton className="rounded-md w-[76%] h-5" />
             
              </div>

            

              {/* <span
                                      className={`${statusClasses[status]} text-white font-bold py-1 px-3 rounded-2xl shadow-lg shadow-gray-400`}
                                    >
                                      {product.inventoryStatus}
                                    </span> */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
    </div>
  );
};
