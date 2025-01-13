import React from "react";
import { Card } from "../../module/components/dashboard/card";
import { LastTransactions } from "../../module/components/dashboard/lastTransactions";
import { User } from "../../module/components/dashboard/user";
import { Moneyflow } from "../../module/components/dashboard/moneyflow";



export const Dashboard = () => {
  return <>
  <div className="flex overflow-clip flex-wrap-reverse relative w-full">
    <div className="absolute blur-sm w-full -right-[121px] -z-20 h-full">
  <img src="/home/home3.png" className="w-[45%] -top-10 right-28 aspect-auto opacity-90 clip-dashbo -z-30 absolute" alt="" />
    </div>
  <div className="flex  my-6  mx-5 flex-col flex-grow basis-1/2">
  <div className="flex justify-between w-full">
    {/* componente de header */}
  <h1 className="text-2xl font-bold">Dashboard</h1>
  <div>Aug 16 2019</div>
  </div>
  <div className="flex justify-center animate-transitionleft items-center w-full">
  <Card/>
  </div>
  <div className="flex flex-col w-full mt-4 h-full">
    <LastTransactions/>
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
