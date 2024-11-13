import React from "react";
import { Toolbar } from "../../elements/Toolbar";
import { Description } from "../../elements/description";
import { Category } from "../../elements/category";
import { Inventoy } from "../../elements/Inventoy";

export const AddProducts = () => {
  return (
    <>
      <div className="z-30 w-full">
        <Toolbar />
        <div className=" md:flex md:mx-20 justify-center items-center ">
          <div className="grow basis-72 ">
            <Description />
            <Category option_category={["Food","Test"]} option_tipo={["Food","Test"]}/>
            <Inventoy/>
          </div>
          <div className="grow basis-72 ">mundo</div>
        </div>
      </div>
    </>
  );
};
