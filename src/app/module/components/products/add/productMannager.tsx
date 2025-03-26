import React  from "react";
import { TabSelect } from "../../../widgets/tabsSelect";
import { PageTitleInit } from "../../../layout/tollbar/tiltleInit";
import { Toolbar } from "../../../widgets/Toolbar";


export const SelectAddProducts = () => {
  

  return (
    <>
    <PageTitleInit/>
    <div className="w-full">
           <div className="w-[85%]">
             <TabSelect link="/products/add/" />
           </div>
         </div>
           <Toolbar action='Add Product' element='Admin of Product'/>
    </>
  );
};
