import React, { useState } from "react";
import { FaBoxes, FaClipboardList } from "react-icons/fa";
import { Option } from "../../../../interface/TypeTabs";
import { TabsNext } from "../../widgets/tabs";

export const TollButtom = ({children}:any) => {

  const [linkchange, setlinkchange] = useState('')
  
  const onLinkChange = (link:any)=>{
setlinkchange(linkchange)
  }

  const DataTabs:Option[] = [
    { option:"List Frontal",component:children[0],icon:<FaClipboardList/>,link:''},
    { option:"Tabla",component:children[1], icon:<FaClipboardList/>,link:''},
    { option:"List Horizontal ",component:children[2], icon:<FaBoxes/>,link:''},
   { option:"Credit",component:"", icon:<FaClipboardList/>,link:''},
 //   { option:"Credit",component:"", icon:<FaClipboardList/>},
    ]

  return (
    <>
    <div className="pl-10 pt-6">

            <label className="w-24  font-bold">Group by</label>
        <div className="flex animate-appearance-in  w-full gap items-start justify-between">
            <TabsNext onLinkChange={onLinkChange}  children={DataTabs}/>
        </div>
    </div>
    </>
  );
};
