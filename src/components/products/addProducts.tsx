import React from "react";
import { Toolbar } from "../../elements/Toolbar";
import { Description } from "../../elements/description";
import { Category } from "../../elements/category";
import { Inventoy } from "../../elements/Inventoy";
import { Selling_Type } from "../../elements/Selling_type";
import { Images } from "../../elements/addImage";
import { Shipping_Delivery } from "../../elements/Shipping_Delivery";
import { Pricing } from "../../elements/Pricing";
import { Submit } from "../../elements/Submit";

export const AddProducts = () => {
  return (
    <>
      <div className="z-30 overflow-clip w-full">
        <Toolbar />
        <div className=" md:flex  md:mx-2 justify-center items-center ">
          <div className="grow basis-72 px-5 ">
            <Description />
            <Category option_category={["Food","Test"]} option_tipo={["Food","Test"]}/>
            <Inventoy/>
            <Selling_Type/>
          </div>
          <div className="grow mb-auto basis-72 px-5">
            <Images/>
            <Shipping_Delivery/>
            <Pricing/>
            <div>
              <Submit/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
