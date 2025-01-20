import React  from "react";
import { TabSelect } from "../../widgets/tabsSelect";
import { PageTitleInit } from "../../layout/tollbar/tiltleInit";


export const Products = () => {
  

  return (
    <>
    <PageTitleInit/>
    <div className="w-full">
           <div className="w-[85%]">
             <TabSelect link="/products/add/" />
           </div>
         </div>
    </>
  );
};
