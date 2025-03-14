import React, { useEffect, useState } from "react";
import { Type_product } from "../products/type_product";
import { Avatar, Button } from "@nextui-org/react";
import { useDelite } from "../../../hooks/useDelite";
import { useEjecut } from "../../../hooks/useEjecut";
import { port } from "../../../../config/env";
import { StarRating } from "../../widgets/startRating";
import { Toolbar } from "../../widgets/Toolbar";
import { Modal_Component } from "../../widgets/modal";
import { PageTitleInit } from "../../layout/tollbar/tiltleInit";

export const SelectStoreforDelite = () => {
  const { DeliteFetch } = useDelite();

  const [actionState, setActionState] = useState(false);
  const [idStore, setidStore] = useState(null);

  const handleActionChange = (newState: boolean) => {
    setActionState(newState);
  };

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

  useEffect(() => {
    if (actionState) {
      DeliteFetch({ url: "stores/delete/", id: idStore });
    }
  }, [actionState]);

  const StoreInfo = ({ img, name, rating,text }: any) => {
    return (
      <>
       <p className="text-center">{text}</p>
        <div className="flex inset-0 justify-center ">
          <Avatar
            src={port + img}
            className="w-20 shadow-lg shadow-violet-800 border aspect-auto h-20 text-large"
          />
          <div className="ml-4 justify-center flex flex-col">
            <span className="text-xl font-extrabold text-slate-600 ">
              {name}
            </span>
            <StarRating rating={rating} size={21} />
          </div>
        </div>
      </>
    );
  };

  const onActionChange = (closeModal: () => void) => {
    handleActionChange(true)
    closeModal();
  }

  return (
    <>
      <PageTitleInit />
      <div className="w-full">
        <div className="flex ml-10 mt-5 gap-4 flex-auto flex-wrap">
          {data?.map((data: any, index: number) => {
            return (
              <>
                <Modal_Component
                  key={data.id}
                  background={{from:"violet-500",opacity:"70",to:"teal-500"}}

                  component={
                    <StoreInfo
                    name={data.name}
                    rating={data.rating}
                    img={data.imgStore}
                    text={
                      "Are you sure you want to delete this Store " + data.name
                    }
                    />
                  }
                  title={"Warning"}
                  onClick={() => setidStore(data.id)}
                  className="w-[30%] mt-10 animate-appearance-in duration-1000 h-60"
                onActionChange={(closeModal) => onActionChange(closeModal)}
                >
                  <Type_product
                    position="vertical"
                    key={data.id}
                    idStore={data.id}
                    scale="125"
                    button={buttonClasses[index % buttonClasses.length]}
                    fondo={fondoClasses[index % fondoClasses.length]}
                    image={`${port + data.imgPortada}`}
                    title={`${data.name}`}
                    textsecondary="For more info look out page soport"
                    text={data.description}
                  />
                </Modal_Component>
              </>
            );
          })}
        </div>
      </div>
          <Toolbar action="Delite Stores" element="Admin of Store" />
    </>
  );
};
