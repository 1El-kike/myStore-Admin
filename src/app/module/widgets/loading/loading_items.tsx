import { Card, Skeleton, Spacer, Spinner } from "@nextui-org/react";
import React from "react";
import { Tables } from "../table/tableStore";
interface TypeLoading {
  typeLoad?: "vertical" | "horisontal" | "Table";
  position?: string;
  
}

export const Loading_items: React.FC<TypeLoading> = ({
  typeLoad = "horisontal",
}) => {


  const CustomCard = () => (
    <div className="flex-col relative flex">
      <div className="w-full h-full transition-all  ease-in-out duration-700 cursor-pointer mb-10">
        <div
          className={` w-full relative overflow-hidden border h-full shadow-2xl shadow-slate-300 text-slate-200 lg:flex p-5 rounded-3xl`}
        >
          <div
            className={`rounded-2xl overflow-hidden flex h-full ${
              typeLoad == "vertical" ? "" : "w-full lg:w-[30%] "
            }`}
          >
            {typeLoad == "horisontal" ? (
              <Skeleton className="rounded-lg w-full lg:w-52 h-52"></Skeleton>
            ) : (
              <div className="absolute top-0 w-full h-full blur-sm">
                <div className="rounded-lg bg-gradient-to-tr from-rose-100 to-violet-100 h-full clip-edit  w-full z-10"></div>
              </div>
            )}
          </div>
          {typeLoad == "vertical" ? (
            <div
              className={` relative flex flex-col my-7 justify-center items-center w-full  ml-2 z-20 `}
            >
              
                <Skeleton className="rounded-md w-[92%] mb-4  h-7 bottom-2 right-2 " />
                <Skeleton className="rounded-md w-[70%] lg:w-[77%] h-4 mb-2 right-2 " />
                <Skeleton className="rounded-md w-[68%] lg:w-[76%] h-4 mb-2 right-2 " />
                <Skeleton className="rounded-md w-[42%] lg:w-[65%] h-4 mb-5 right-2 " />
                <Skeleton className="rounded-md w-[75%] h-5 mb-2 right-2 " />
                <Skeleton className="rounded-md w-[45%] h-5  right-2 " />
            
            </div>
          ) : (
            typeLoad == "horisontal" && (
              <div
                className={`text-center relative m-auto justify-center w-full  ml-2 lg:ml-20 -500 z-20 `}
              >
                <div className="mb-4 mt-5 w-full">
                  <Skeleton className="rounded-md w-[75%]  h-7 bottom-2 right-2 " />
                </div>
                <div className="text-center leading-6 tracking-tighter font-semibold text-ellipsis mb-4 max-w-96">
                  <Skeleton className="rounded-md w-[70%] lg:w-[67%] h-4 mb-2 right-2 " />
                  <Skeleton className="rounded-md w-[70%] lg:w-[66%] h-4 mb-2 right-2 " />
                  <Skeleton className="rounded-md w-[42%] lg:w-[65%] h-4 mb-2 right-2 " />
                </div>
                <div className=" text-xl font-semibold text-center  max-w-96">
                  <Skeleton className="rounded-md w-[75%] h-5 right-2 " />
                </div>
              </div>
            )
          )}

          <button
            className={` z-20 absolute bottom-2 right-2 p-3 flex justify-center items-center rounded-full mt-auto `}
          >
            <Skeleton className="rounded-full absolute bottom-2 right-2 p-5"></Skeleton>
            <Spinner
              labelColor="danger"
              color="danger" /* label="Loading..." */
            />
          </button>
        </div>
        <div
          className={
            "absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-10 "
          }
        >
          <div className={" flex justify-center items-center  rounded-2xl "}>
            <Spinner
              className="absolute z-20"
              labelColor="danger"
              color="danger" /* label="Loading..." */
            />

            <Skeleton className="rounded-lg w-16 h-16"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {typeLoad == "horisontal" && (
        <div className="flex mt-10 flex-col  gap-4 ">
          <CustomCard />
          <CustomCard />
          <CustomCard />
        </div>
      )}
      {typeLoad == "vertical" && (
        <div className="flex  gap-4 flex-auto flex-wrap">
          <div className="w-[100%] mb-7 md:w-[45%] lg:w-[32%]   mt-12 animate-appearance-in duration-1000 h-60 ">
            <CustomCard />
          </div>
          <div className="w-[100%] md:w-[45%] lg:w-[32%]   mt-12 animate-appearance-in duration-1000 h-60 ">
            <CustomCard />
          </div>
          <div className="w-[100%] md:w-[45%] lg:w-[32%]   mt-12 animate-appearance-in duration-1000 h-60 ">
            <CustomCard />
          </div>
          <div className="w-[100%] md:w-[45%] lg:w-[32%]   mt-12 animate-appearance-in duration-1000 h-60 ">
            <CustomCard />
          </div>
          <div className="w-[100%] md:w-[45%] lg:w-[32%]   mt-12 animate-appearance-in duration-1000 h-60 ">
            <CustomCard />
          </div>
          <div className="w-[100%] mb-7 md:w-[45%] lg:w-[32%]   mt-12 animate-appearance-in duration-1000 h-60 ">
            <CustomCard />
          </div>
          <div className="w-[100%] md:w-[45%] lg:w-[32%]   mt-12 animate-appearance-in duration-1000 h-60 ">
            <CustomCard />
          </div>
        </div>
      )}

      {typeLoad == 'Table' && (
        <div className="flex relative justify-center items-center w-full h-full">
            <Skeleton className="rounded-lg  w-full h-56"></Skeleton>
          <Spinner
              className="absolute"
              labelColor="danger"
              color="danger" 
              label="Loading..."
            />
        </div>
      )}
    </>
  );
};
