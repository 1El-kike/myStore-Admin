import React from "react";
import { TabSelect } from "../../elements/tabsSelect";
import { Toolbar } from "../../elements/Toolbar";

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
