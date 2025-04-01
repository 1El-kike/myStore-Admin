import React  from "react";
import { PageTitleInit } from "../../../layout/tollbar/tiltleInit";
import { TabSelect } from "../../../widgets/tabsSelect";
import { Toolbar } from "../../../widgets/Toolbar";


export const SelectEditProducts = () => {
  

  return (
    <>
    <PageTitleInit/>
    <div className="w-full">
           <div className="w-[85%]">
             <TabSelect link="/products/select/edit/" notId={true} linkallData="edit/" allData="allProducts" />
           </div>
         </div>
           <Toolbar action='Edit Products' element='Admin of product'/>
    </>
  );
};