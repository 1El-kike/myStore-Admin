import { Button, Skeleton, Spinner } from "@nextui-org/react";
import React from "react";
import { FaHeart, FaPlus, FaShare } from "react-icons/fa";

export default function LoadingWatch() {
  const CarouselLoad = () => {
    return (
      <div className="flex flex-col justify-center items-center ">
        <div className="w-[80%] relative rounded-xl border  h-[300px] lg:h-[500px] overflow-hidden">
          <div className="h-full relative w-full flex ">
            <Skeleton className="rounded-md w-full h-[500px] mb-2 flex-shrink-0" />
            <Spinner
              className="absolute left-[45%] top-[50%]"
              labelColor="danger"
              color="danger" /* label="Loading..." */
            />
          </div>
        </div>
        <div className="w-[60%] pl-2  overflow-hidden">
          <div className={`mt-4 w-full`}>
            <div className="flex items-center my-2 gap-4 ">
              <Skeleton className="rounded-md w-20 h-20 mb-2" />
              <Skeleton className="rounded-md w-20 h-20 mb-2" />
              <Skeleton className="rounded-md w-20 h-20 mb-2" />
              <Skeleton className="rounded-md w-20 h-20 mb-2" />
              <Skeleton className="rounded-md w-20 h-20 mb-2" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AsideDetailLoad = () => {
    return (
      <div className="grow ml-6 lg:ml-0 flex flex-col gap-3">
        <Skeleton className="rounded-md w-[20%] h-4 mb-2" />

        <Skeleton className="rounded-md w-[30%] h-6 mb-2" />

        <Skeleton className="rounded-md w-[50%] h-5 mb-2" />

        <Skeleton className="rounded-md w-[40%] h-5 mb-2" />

        <Skeleton className="rounded-md w-[30%] h-7 mb-2" />

        <Skeleton className="rounded-md w-[20%] h-5 mb-2" />

        <Skeleton className="rounded-md w-[90%] h-4 " />
        <Skeleton className="rounded-md w-[85%] h-4 " />
        <Skeleton className="rounded-md w-[82%] h-4 " />

        <div className="flex mt-4 w-full pr-6 items-start justify-between">
          <span className="text-base  font-bold">Type of product</span>
          <div className="w-52 justify-center flex flex-col items-center bgred">
            <Skeleton className="rounded-md w-[80%] h-4 mb-1" /> 
            <Skeleton className="rounded-md w-[70%] h-3 mb-2" /> 
         </div>
        </div>
        <div className="flex w-full pr-6 items-center justify-between">
          <span className="text-base font-bold">Quantitly Total</span>
          <Skeleton className="rounded-md w-[40%] h-6 mb-2" />
        </div>
        <div className="flex mt-10 items-center justify-center gap-6">
          <button className="bg-gradient-to-br flex justify-center items-center gap-3 from-violet-300 py-4 hover:scale-110 duration-400 hover:bg-gradient-to-bl hover:from-blue-500 hover:to-violet-500 hover:text-white px-6 rounded-xl font-bold text-slate-500 to-teal-200">
            <span>Go to the store</span>
          </button>
          <button className="bg-gradient-to-br flex justify-center items-center gap-3 from-violet-300 py-4 hover:scale-110 duration-400 hover:bg-gradient-to-bl hover:from-blue-500 hover:to-violet-500 hover:text-white px-6 rounded-xl font-bold text-slate-500 to-teal-200">
            <span>Go to the orders</span>
          </button>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <Button startContent={<FaPlus />} color="secondary" variant="light">
            Compare
          </Button>
          <Button startContent={<FaHeart />} color="secondary" variant="light">
            Favorite
          </Button>
          <Button startContent={<FaShare />} color="secondary" variant="light">
            Share
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-content-center w-full">
      <div className="grow basis-[75%]">
        <div className="mt-5 ml-5">
          <CarouselLoad />
        </div>
      </div>
      <div className="grow basis-[700px] gap-3">
        <AsideDetailLoad />
      </div>
    </div>
  );
}
