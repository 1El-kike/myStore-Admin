import React from "react";
import { Toolbar } from "../../widgets/Toolbar";
import { TabSelect } from "../../widgets/tabsSelect";
import { PageTitleInit } from "../../layout/tollbar/tiltleInit";

export const SelectStoreforEdit = () => {
  return (
    <>
    <PageTitleInit/>
      <div className="w-full">
        <div className="w-[85%]">
          <TabSelect link="/stores/edit/" />
        </div>
      </div>
    <Toolbar action='Edit Stores' element='Admin of Store'/>
    </>
  );
};
