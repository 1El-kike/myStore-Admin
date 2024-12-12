import React, { useEffect } from "react";
import { Type_product } from "./type_product";
import { textProdct } from "../../model/type_product";
import { TollButtom } from "./tollBar";
import { port } from "../../config/env";
import { useEjecut } from "../../hooks/useEjecut";

export const Products = () => {
  const text: string = textProdct;

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

  const { data, isLoading, errors } = useEjecut({ url: "stores" });

  return (
    <div className="w-full z-20 justify-between flex">
      <div className="my-4 relative md:w-[60%] px-2 w-full h-screen scroll-bar-none">
        <div className="w-full mb-10">
          <h2 className="text-3xl text-violet-700 font-bold ml-4">Products</h2>
          <div className="scale-90">
            <TollButtom />
          </div>
        </div>
        <div className="">
          {data?.map((data: any, index: number) => {
            return (
              <>
                <Type_product
                  key={data.id}
                  idStore={data.id}
                  scale="125"
                  button={buttonClasses[index % buttonClasses.length]}
                  fondo={fondoClasses[index % fondoClasses.length]}
                  image={`${port + data.imgPortada}`}
                  title={`Operating in Store ${data.name}`}
                  textsecondary="For more info look out page soport"
                  text={data.description}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
