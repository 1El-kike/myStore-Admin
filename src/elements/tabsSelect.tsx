import React from "react";
import { useEjecut } from "../hooks/useEjecut";
import { Group, List, Table } from "./GroupBy";
import { TollButtom } from "../app/components/products/tollBar";

export const TabSelect = ({ link }: {link: string}) => {
  const buttonClasses = [
    "bg-gradient-to-tr to-violet-700 from-indigo-500",
    "bg-gradient-to-tr to-fuchsia-500 from-fuchsia-900",
    "bg-gradient-to-tr to-orange-500 from-orange-900",
    ,
  ];

  const fondoClasses = [
    "bg-gradient-to-tr to-blue-100 from-violet-100",
    "bg-gradient-to-tr to-rose-100 from-purple-100",
    "bg-gradient-to-tr to-orange-100 from-amber-100",
  ];

  const { data, isLoadingData, errors } = useEjecut({ url: "stores" });

  const option: React.JSX.Element[] = [
    <List
    link={link}
    buttonClasses={buttonClasses}
    fondoClasses={fondoClasses}
    data={data}
    />,
    <Table
      buttonClasses={buttonClasses}
      fondoClasses={fondoClasses}
      data={data}
    />,
    <Group
      buttonClasses={buttonClasses}
      fondoClasses={fondoClasses}
      data={data}
    />,
  /*   <Table data buttonClasses={buttonClasses} fondoClasses={fondoClasses} />, */
  ];

  return (
    <>
      <div className="w-full z-20 flex">
        <div className="my-4 relative md:w-[90%] px-2 w-full h-screen scroll-bar-none">
          <div className="w-full mb-10">
            <div className="bg--700">
              <TollButtom children={option} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
