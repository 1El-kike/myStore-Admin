import React from "react";
import { User } from "./user";
import { Moneyflow } from "./moneyflow";
import { LastTransactions } from "./lastTransactions";
import { Card } from "./card";



export const Dashboard = () => {
  return <>
  <div className="flex overflow-clip flex-wrap-reverse  rever w-full">

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
