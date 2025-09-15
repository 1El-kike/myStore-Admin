import React, { useState } from "react";
import { FaBoxes, FaClipboardList } from "react-icons/fa";
import { Option } from "../../../../interface/TypeTabs";
import { TabsNext } from "../../widgets/tabs";

export const TollButtom = ({ children }: any) => {
  const [linkchange, setlinkchange] = useState("");

  const onLinkChange = (link: string) => {
    setlinkchange(linkchange);
  };

  const DataTabs: Option[] = children[3]
    ? [
      {
        option: "List Frontal",
        component: children[0],
        icon: <FaClipboardList />,
        link: "",
      },
      {
        option: "Tabla",
        component: children[1],
        icon: <FaClipboardList />,
        link: "",
      },
      {
        option: "List Horizontal ",
        component: children[2],
        icon: <FaBoxes />,
        link: "",
      },
      {
        option: "All",
        component: children[3],
        icon: <FaClipboardList />,
        link: "" /* badge:{color:'danger',contex:2} */,
      },
    ]
    : [
      {
        option: "List Frontal",
        component: children[0],
        icon: <FaClipboardList />,
        link: "",
      },
      {
        option: "Tabla",
        component: children[1],
        icon: <FaClipboardList />,
        link: "",
      },
      {
        option: "List Horizontal ",
        component: children[2],
        icon: <FaBoxes />,
        link: "",
      },
    ];

  return (
    <>
      <div className="pl-10 pt-6">
        <label className="w-24  font-bold">Group by</label>
        <div className="flex animate-appearance-in  w-full gap items-start justify-between">
          <TabsNext onLinkChange={onLinkChange} children={DataTabs} />
        </div>
      </div>
    </>
  );
};
