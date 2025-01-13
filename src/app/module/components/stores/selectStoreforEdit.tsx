import React from "react";
import { Toolbar } from "../../widgets/Toolbar";
import { TabSelect } from "../../widgets/tabsSelect";

export const SelectStoreforEdit = () => {
  return (
    <>
      <div className="w-full">
        
    <Toolbar action='Edit Stores' element='Admin of Store'/>
 
        <div className="w-[85%]">
          <TabSelect link="/stores/edit/" />
        </div>
      </div>
    </>
  );
};
