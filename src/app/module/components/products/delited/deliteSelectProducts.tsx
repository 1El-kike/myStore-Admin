import React from "react";
import { PageTitleInit } from "../../../layout/tollbar/tiltleInit";
import { useLocation } from "react-router-dom";
import { useEjecut } from "../../../../hooks/useEjecut";
import { ProductAll } from "../edit/product";
import { Toolbar } from "../../../widgets/Toolbar";
import { NotItems } from "../../../widgets/datosvacios/NotItems";
import { FaShop, FaShopSlash } from "react-icons/fa6";

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
          {errors ? (
            <p>error...</p>
          ) : isLoadingData ? (
            <p>loading...</p>
          ) : items?.length > 0 ? (
            <ProductAll data={items} />
          ) : (
            <NotItems
              link="/stores/add"
              Icon={FaShopSlash}
              text="There Are not stores for watch, before of continue you should add Store in you Count. In next link you would can create one"
            />
          )}
        </div>
      </div>
      <Toolbar action="Add Product" element="Admin of Product" />
    </>
  );
};
