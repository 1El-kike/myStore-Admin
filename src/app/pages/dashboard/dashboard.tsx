import React, { useEffect, useState } from "react";
import { Card } from "../../module/components/dashboard/card/card";
import { LastTransactions } from "../../module/components/dashboard/lastTransactions";
import { User } from "../../module/components/dashboard/user";
import { Moneyflow } from "../../module/components/dashboard/moneyflow";
import { port, PUBLIC_URL } from "../../../config/env";
import { useWebSocket } from "../../hooks/useWebSocket";
import { Image } from "@nextui-org/react";
import dayjs from "dayjs";


export const Dashboard = () => {

  const [filterTimeStart, setfilterTimeStart] = useState<dayjs.Dayjs | null>(
    dayjs()
  );


  useWebSocket(
    window.location.hostname === "localhost"
      ? `ws://localhost:3450`
      : `${port}`,
    filterTimeStart
  );

  return (
    <>
      <div className="flex items-end overflow-clip flex-wrap-reverse relative w-full">
        <div className="absolute blur-sm w-full -right-[121px] -z-20 h-full">
          <div className="w-[45%] -top-10 right-28 aspect-auto opacity-90 clip-dashbo -z-30 absolute">
            <Image
              isBlurred
              alt="Album Cover"
              className=""
              src={`${PUBLIC_URL}home/home3.png`}
              width={"100%"}
            />
          </div>
        </div>
        <div className="flex  my-6  mx-5 flex-col flex-grow basis-1/2">
          <div className="flex justify-between w-full">
            {/* componente de header */}
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div>{`${dayjs().set('month', dayjs().month()).format("MMMM")} ${dayjs().date()} ${dayjs().year()}`}</div>
          </div>
          <div className="flex justify-center animate-transitionleft items-center w-full">
            <Card entityType="card" />
          </div>
          <div className="flex flex-col w-full mt-4 h-full">
            <LastTransactions entityType="transactions" />
          </div>
        </div>
        <div className="flex gap-2 md:gap-14 flex-col mt-14 flex-grow basis-1/3">
          {/* componente de User */}
          <User entityType="moneyinfflow" />
          <Moneyflow entityType="apexChart" />
        </div>
      </div>
    </>
  );
};
