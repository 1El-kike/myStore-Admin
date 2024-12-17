import React from "react";
import { User } from "./user";
import { Moneyflow } from "./moneyflow";



export const Dashboard = () => {
  return <>
  <div className="flex overflow-clip flex-wrap-reverse  rever w-full">

  <div className="flex  my-6  mx-5 flex-col flex-grow basis-1/2">
  <div className="flex justify-between w-full">
    {/* componente de header */}
  <h1>Dashboard</h1>
  <div>Aug 16 2019</div>
  </div>
  <div className="flex justify-center items-center w-full h-60 bg-gray-300 rounded-2xl">
  componente de tarjeta de credito
  </div>
  <div className="flex justify-center items-center w-full  my-4 border border-gray-200 rounded-2xl h-full">
    Componente de Last transacions
  </div>
  </div>
  <div className="flex flex-col mt-5 flex-grow basis-1/3">
    {/* componente de User */}
  <User/>
  <Moneyflow />
  </div>
  </div>
  
  </>;
};
