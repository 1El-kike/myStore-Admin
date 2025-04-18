import React from "react";
import { PageTitleInit } from "../../../layout/tollbar/tiltleInit";
import { Toolbar } from "../../../widgets/Toolbar";
import { useEjecut } from "../../../../hooks/useEjecut";
import {  useLocation } from "react-router-dom";
import { ProductAll } from "./product";
import { NotItems } from "../../../widgets/datosvacios/NotItems";
import { FcPaid } from "react-icons/fc";

export const SelectStoreEditProduct = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const {
    data: items,
    errors,
    isLoadingData,
  } = useEjecut({ url: `productStore/store/${id}` });

  return (
    <>
      <PageTitleInit />
      <div className="w-full m-10">
        {isLoadingData && <p>loading...</p>}
        <div className="w-[70%] ">
        {items && items.length > 0 ?<ProductAll data={items} /> : 
        <NotItems link={`/products/add/${id}`} Icon={FcPaid} text=" Don't products that show. First you have that add new Product in Store . Follou next link for start"/>
        }
        </div>
      </div>
      <Toolbar action="Add Product" element="Admin of Product" />
    </>
  );
};
