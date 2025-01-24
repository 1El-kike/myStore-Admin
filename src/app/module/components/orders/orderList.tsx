import React, { useEffect, useState } from "react";
import { PageTitleInit } from "../../layout/tollbar/tiltleInit";
import { TotalList } from "./totalList";
import { TabsNext } from "../../widgets/tabs";
import { Option } from "../../../../interface/TypeTabs";
import { FaReplyAll } from "react-icons/fa";
import { Table } from "../../widgets/GroupBy";
import { MdNoiseAware, MdOutlineIncompleteCircle, MdOutlinePendingActions, MdPendingActions } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useEjecut } from "../../../hooks/useEjecut";

interface TypeOrder {
  totalOrdersDay:number,
  totalOrders: number,
  totalAmountDay: number,
  totalOrdersData:any[],
  totalOrderDataDay:any[],
  countsByStatus: {
    pendingCount:number,
    pendingDay: number,
    acceptedCount:number,
    acceptedDay: number,
    deliveredDay: number,
    deliveredCount: number,
    cancelled: number,
    cancelledDay: number,
  },
} 
 

export const OrderList = () => {

  const columns = [
    {name: "ORDER", uid: "order"},
    {name: "PAYMENT METHOD", uid: "methodPayment"},
    {name: "CUSTOMER", uid: "customer"},
    {name: "STATUS", uid: "status"},
    {name: "", uid: "actions"},
  ];
  
   const { data, isLoadingData, errors } = useEjecut({ url: "orders" });

   const [datos, setDatos] = useState<TypeOrder | null>(null);

   useEffect(() => {
     setDatos(data);
   }, [data])
   
   if (!datos) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras no haya datos
  }
   
   console.log(datos.totalOrderDataDay);
  const Datacomponent: Option[] = [
    {
      option: "All",
      component: <Table columns={columns} data={datos.totalOrderDataDay} />,
      icon: <FaReplyAll size={22} />,
      badge:{color:'secondary',contex:datos?.totalOrdersDay | 0}
    },
    {
      option: "Completed",
      component: <Table columns={columns} data={[]} />,
      icon: <MdOutlineIncompleteCircle size={22} />,
      badge:{color:'success',contex:datos?.countsByStatus?.acceptedDay | 0}
    },
    {
      option: "Pending",
      component: <Table columns={columns} data={[]} />,
      icon: <MdOutlinePendingActions size={22} />,
      badge:{color:'warning',contex:datos?.countsByStatus?.pendingDay | 0}

    },
    {
      option: "Canceled",
      component: <Table columns={columns} data={[]} />,
      icon: <ImCancelCircle size={22} />,
      badge:{color:'danger',contex:datos?.countsByStatus?.cancelledDay | 0}
    },
    {
      option: "Rejected",
      component: <Table columns={columns} data={[]} />,
      icon: <MdNoiseAware size={22} />,
      badge:{color:'primary',contex:datos?.countsByStatus?.deliveredDay | 0 }
    },
   
  ];

  return (
    <>
      <PageTitleInit />
      <div className=" w-[98%] md:w-[95%] m-1 md:m-5">
        <TotalList active={datos?.countsByStatus?.pendingCount} complet={datos?.countsByStatus.acceptedCount} total={datos?.totalOrders} />
      </div>
      <div className="m-1 md:m-5 bg-gradient-to-tr from-violet-200 to-rose-200 rounded-3xl ">
        <TabsNext variant="underlined" children={Datacomponent} />
      </div>
    </>
  );
};
