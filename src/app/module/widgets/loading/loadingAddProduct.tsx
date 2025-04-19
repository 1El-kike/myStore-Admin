import { Skeleton, Spinner } from "@nextui-org/react";
import React from "react";

export const LoadingAddProduct = () => {
  return (
    <>
      <div className="h-16 md:h-80 flex ">
        <div className="flex grow relative justify-end ">
          <Spinner
            className="absolute left-5 top-5 md:left-[25%] md:top-[50%]"
            labelColor="danger"
            color="danger" /* label="Loading..." */
          />
          <div className="hidden md:flex mt-16 w-full  lg:w-[55%] flex-col relative bg-gradient-to-tr from-violet-100 to-teal-100 rounded-xl py-2 px-4 h-64 -top-20">
            <Skeleton className="rounded-md mt-5 w-52 h-6 mb-2" />
            <Skeleton className="rounded-md w-[30%] h-6 mb-2" />
            <Skeleton className="rounded-md w-[30%] h-6 mb-2" />
            <div className="flex mt-10 w-[54%] justify-between">
              <Skeleton className="rounded-md w-[30%] h-6 mb-2" />
              <Skeleton className="rounded-md w-[30%] h-6 mb-2" />
            </div>
            <div className="flex w-[54%] justify-between">
              <Skeleton className="rounded-md w-[30%] h-6 mb-2" />
              <Skeleton className="rounded-md w-[30%] h-6 mb-2" />
            </div>
            <Skeleton className="rounded-full absolute -right-10 -bottom-32 w-60 h-60  mb-2" />

          </div>
        </div>
      </div>
    </>
  );
};
