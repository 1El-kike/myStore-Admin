import React from "react";
import { PageTitleInit } from "../../../layout/tollbar/tiltleInit";
import { Toolbar } from "../../../widgets/Toolbar";
import { useEjecut } from "../../../../hooks/useEjecut";
import { useLocation } from "react-router-dom";
import { ProductAll } from "./product";
import { NotItems } from "../../../widgets/datosvacios/NotItems";
import { FcPaid } from "react-icons/fc";
import { ErrorsItems } from "../../../errors/errorsItems";

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
        <div className="w-[70%] ">
          <ProductAll data={items}  Loading={isLoadingData} error={errors} />
        </div>
      </div>
      <Toolbar action="Add Product" element="Admin of Product" />
    </>
  );
};
