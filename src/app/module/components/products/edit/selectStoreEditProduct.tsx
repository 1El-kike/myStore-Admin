import React from "react";
import { PageTitleInit } from "../../../layout/tollbar/tiltleInit";
import { Toolbar } from "../../../widgets/Toolbar";
import { useEjecut } from "../../../../hooks/useEjecut";
import { Link, useLocation } from "react-router-dom";
import { port } from "../../../../../config/env";
import { ProductAll } from "./product";

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
        <div className="flex justify-center items-end flex-col w-[80%] ">
        {isLoadingData && <p>loading...</p>}
        {items && <ProductAll data={items} />}
        </div>
      </div>
      <Toolbar action="Add Product" element="Admin of Product" />
    </>
  );
};
