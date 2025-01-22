import React from "react";
import { PageTitleInit } from "../../layout/tollbar/tiltleInit";
import { TotalList } from "./totalList";
import { TabsNext } from "../../widgets/tabs";
import { Option } from "../../../../interface/TypeTabs";
import { FaReplyAll } from "react-icons/fa";
import { Table } from "../../widgets/GroupBy";
import { MdNoiseAware, MdOutlineIncompleteCircle, MdOutlinePendingActions, MdPendingActions } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useEjecut } from "../../../hooks/useEjecut";

export const OrderList = () => {

  const columns = [
    {name: "ORDER", uid: "order"},
    {name: "PAYMENT METHOD", uid: "method"},
    {name: "CUSTOMER", uid: "customer"},
    {name: "STATUS", uid: "status"},
    {name: "", uid: "action"},
  ];
  
   const { data, isLoadingData, errors } = useEjecut({ url: "stores" });

  const Datacomponent: Option[] = [
    {
      option: "All",
      component: <Table columns={columns} data={[]} />,
      icon: <FaReplyAll size={22} />,
      badge:{color:'secondary',contex:19}
    },
    {
      option: "Completed",
      component: <Table columns={columns} data={[]} />,
      icon: <MdOutlineIncompleteCircle size={22} />,
      badge:{color:'success',contex:8}
    },
    {
      option: "Pending",
      component: <Table columns={columns} data={[]} />,
      icon: <MdOutlinePendingActions size={22} />,
      badge:{color:'warning',contex:8}

    },
    {
      option: "Canceled",
      component: <Table columns={columns} data={[]} />,
      icon: <ImCancelCircle size={22} />,
      badge:{color:'danger',contex:1}
    },
    {
      option: "Rejected",
      component: <Table columns={columns} data={[]} />,
      icon: <MdNoiseAware size={22} />,
      badge:{color:'primary',contex:2 }
    },
   
  ];

  return (
    <>
      <PageTitleInit />
      <div className=" w-[98%] md:w-[95%] m-1 md:m-5">
        <TotalList />
      </div>
      <div className="m-1 md:m-5 bg-gradient-to-tr from-violet-200 to-rose-200 rounded-3xl ">
        <TabsNext variant="underlined" children={Datacomponent} />
      </div>
    </>
  );
};
