import React, { useEffect, useState } from "react";
import { Type_product } from "../../products/type_product";
import { Avatar, Button, Dropdown } from "@nextui-org/react";
import { useDelite } from "../../../../hooks/useDelite";
import { useEjecut } from "../../../../hooks/useEjecut";
import { port } from "../../../../../config/env";
import { StarRating } from "../../../widgets/startRating";
import { Toolbar } from "../../../widgets/Toolbar";
import { Modal_Component } from "../../../widgets/modal";
import { PageTitleInit } from "../../../layout/tollbar/tiltleInit";
import { NotItems } from "../../../widgets/datosvacios/NotItems";
import { FaDeleteLeft } from "react-icons/fa6";
import { FcHighPriority } from "react-icons/fc";

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

  const StoreInfo = ({ img, name, rating, text, alert }: any) => {
    return (
      <>
        <p className="text-center">{text}</p>
        <p className="text-center text-rose-800">{alert}</p>
        <div className="flex justify-center inset-0">
          <Avatar
            src={port + img}
            className="border h-20 shadow-lg shadow-violet-800 text-large w-20 aspect-auto"
          />
          <div className="flex flex-col justify-center ml-4">
            <span className="text-slate-600 text-xl font-extrabold">
              {name}
            </span>
            <StarRating rating={rating} size={21} />
          </div>
        </div>
      </>
    );
  };

  const onActionChange = (closeModal: () => void) => {
    handleActionChange(true);
    closeModal();
  };


  return (
    <div className=" flex flex-col justify-between h-screen">
      <div>     
      <PageTitleInit />
      <div className="w-full">
        <div className="flex flex-auto flex-wrap gap-4 ml-10 mt-5">
          {errors ? (
            <p>error...</p>
          ) : isLoadingData ? (
            <p>Loading...</p>
          ) : data?.length > 0 ? (
            data?.map((data: any, index: number) => {
              return (
                <>
                  <Modal_Component
                    key={data.id}
                    // background={{from:"violet-500",opacity:"70",to:"teal-500"}}

                    component={
                      <StoreInfo
                        name={data.name}
                        rating={data.rating}
                        img={data.imgStore}
                        text={
                          "Are you sure you want to delete this Store " +
                          data.name
                        }
                        alert=" You will not be able to undo the change and all related records will be lost"
                      />
                    }
                    title={"Warning"}
                    onClick={() => setidStore(data.id)}
                    className="h-60 w-[30%] animate-appearance-in duration-1000 mt-10"
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
            })
          ) : (
            <NotItems
              link="/stores/add"
              Icon={FcHighPriority}
              text="There are currently no stores to display, follow the link below to create a store"
            />
          )}
        </div>
      </div>
      </div>
      <div className="">
      <Toolbar action="Delite Stores" element="Admin of Store" />
      </div>
    </div>
  );
};
