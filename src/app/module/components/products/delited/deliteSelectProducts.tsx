import React from "react";
import { PageTitleInit } from "../../../layout/tollbar/tiltleInit";
import { useLocation } from "react-router-dom";
import { useEjecut } from "../../../../hooks/useEjecut";
import { ProductAll } from "../edit/product";
import { Toolbar } from "../../../widgets/Toolbar";

export const DeliteSelectProducts = () => {
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
        <div className=" w-[70%] ">
          <ProductAll
            data={items}
            error={errors}
            Loading={isLoadingData}
            text="There Are not product for watch, before of continue you should add Store in you Count. In next link you would can create one"
          />
        </div>
      </div>
      <Toolbar action="Add Product" element="Admin of Product" />
    </>
  );
};
