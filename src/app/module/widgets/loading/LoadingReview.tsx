import { Skeleton, Spinner } from "@nextui-org/react";
import React from "react";

export const MessageReviewLoading = () => (
    <div className="flex border-t-1 w-full">
    <div className="flex  flex-col mt-5 items-center w-full">
      <div className="flex flex-col md:flex-row justify-between w-[90%] m-5">
        <div className="flex w-60   mb-3 md:mb-0 md:flex-col gap-5 md:gap-1 items-center md:w-[20%]">
          <Skeleton className="w-16 h-16  rounded-full" />
          <div className="w-60 rounded-md items-center flex flex-col gap-2">
            <Skeleton className="w-[60%] rounded-md h-4" />
            <Skeleton className="w-[40%] h-4 rounded-md" />
          </div>
        </div>
        <div className="flex flex-col gap-2 pl-3 w-[95%] md:w-[70%]">
          <Skeleton className="w-[19%] rounded-md h-6" />
          <Skeleton className="w-[10%] rounded-md h-4" />
          <Skeleton className="w-[70%] rounded-md h-4" />
          <Skeleton className="w-[60%] rounded-md h-4" />
        </div>
      </div>
    </div>
  </div>
)


export const LoadingReview = () => {

  return (
    <div>
      <div className="flex  flex-col md:flex-row md:pl-3 scale-90 items-center">
        <div className="grow  w-full md:basis-56 border-r">
          {/* cantidad de rating verdadera */}
          <div className="flex flex-col  items-center justify-center md:gap-3">
            <p className=" md:text-xl font-bold">Average rating</p>
            <div className="flex items-center justify-center">
              <Spinner labelColor="danger" color="danger" />
              <h1 className=" text-4xl md:text-7xl bg-gradient-to-tr from-slate-800 bg-clip-text text-transparent to-rose-900 font-extrabold">{`/5`}</h1>
            </div>
            <Skeleton className="rounded-md w-[40%] h-6 mb-2" />
            <Skeleton className="rounded-md w-[30%] h-6 mb-2" />
          </div>
        </div>
        <div className="grow flex flex-col items-center justify-center   w-full md:basis-56 border-r">
          <Skeleton className="rounded-md w-[350px] h-[20px] mb-2" />
          <Skeleton className="rounded-md w-[350px] h-[20px] mb-2" />
          <Skeleton className="rounded-md w-[350px] h-[20px] mb-2" />
          <Skeleton className="rounded-md w-[350px] h-[20px] mb-2" />
          <Skeleton className="rounded-md w-[350px] h-[20px] mb-2" />
        </div>
        <div className="grow flex justify-center items-center basis-56 ">
          <Spinner labelColor="danger" color="danger" />
        </div>
      </div>
      <MessageReviewLoading/>
      <MessageReviewLoading/>
      <MessageReviewLoading/>
    </div>
  );
};
