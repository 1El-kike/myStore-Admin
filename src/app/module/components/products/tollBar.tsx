import React from "react";
import { FaBoxes, FaClipboardList } from "react-icons/fa";
import { Option } from "../../../../interface/TypeTabs";
import { TabsNext } from "../../widgets/tabs";

export const TollButtom = ({children}:any) => {
  
  
  console.log(children)

  const DataTabs:Option[] = [
    { option:"Tabla",component:children[0], icon:<FaClipboardList/>},
    { option:"List Frontal",component:children[1],icon:<FaClipboardList/>},
    { option:"List Horizontal ",component:children[2], icon:<FaBoxes/>},
   { option:"Credit",component:"", icon:<FaClipboardList/>},
 //   { option:"Credit",component:"", icon:<FaClipboardList/>},
   // { option:"Credit",component:"", icon:<FaClipboardList/>},
    ]

  return (
    <>
    <div className="pl-10 pt-6">

            <label className="w-24  font-bold">Group by</label>
        <div className="flex animate-appearance-in  w-full gap items-start justify-between">
            <TabsNext children={DataTabs}/>
        </div>
    </div>
    </>
  );
};
