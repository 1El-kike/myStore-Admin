import React, { useEffect, useState } from "react";
import { PageTitleInit } from "../../layout/tollbar/tiltleInit";
import { TotalList } from "./totalList";
import { TabsNext } from "../../widgets/tabs";
import { Option } from "../../../../interface/TypeTabs";
import { FaReplyAll } from "react-icons/fa";
import { Table } from "../../widgets/GroupBy";
import {
  MdNoiseAware,
  MdOutlineIncompleteCircle,
  MdOutlinePendingActions,
  MdPendingActions,
} from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useEjecut } from "../../../hooks/useEjecut";

interface TypeOrder {
  totalOrdersDay: number;
  totalOrders: number;
  totalAmountDay: number;
  totalOrderData:any[];
  totalOrderDataDay: any[];
  totalOrderCanceledDay: any[];
  totalOrderCompleteDay: any[];
  totalOrderPendingDay: any[];
  totalOrderRejectedDay: any[];
  countsByStatus: {
    pendingCount: number;
    pendingCountday: number;
    acceptedCount: number;
    acceptedCountday: number;
    deliveredCountday: number;
    deliveredCount: number;
    cancelledCount: number;
    cancelledCountday: number;
  };
}

export const OrderList = () => {
  const columns = [
    { name: "ORDER", uid: "order" },
    { name: "PAYMENT METHOD", uid: "methodPayment" },
    { name: "CUSTOMER", uid: "customer" },
    { name: "STATUS", uid: "status" },
    { name: "", uid: "actions" },
  ];

  const [link, setlink] = useState("allday");

  const { data, isLoadingData, errors } = useEjecut({
    url: `orders/sumary?include=${link}`,
  });

  const [datos, setDatos] = useState<TypeOrder | null>(null);

  const onLinkChange = (link: string) => {
    setlink(link);
    
  };

  useEffect(() => {
    setDatos(data);
  }, [data]);

  if (!datos) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    ); // Mostrar un mensaje de carga mientras no haya datos
  }

  //console.log(datos.totalOrderDataDay);
  const Datacomponent: Option[] = [
    {
      option: "All",
      component: (
        <Table
          columns={columns}
          data={datos.totalOrderData ? datos.totalOrderData : []}
          isDetails={true}
        />
      ),
      icon: <FaReplyAll size={22} />,
      badge: { color: "primary", contex: datos?.totalOrdersDay | 0 },
      link: "all",
    },
    {
      option: "Completed",
      component: (
        <Table
          columns={columns}
          data={datos.totalOrderCompleteDay ? datos.totalOrderCompleteDay : []}

        />
      ),
      icon: <MdOutlineIncompleteCircle size={22} />,
      badge: {
        color: "secondary",
        contex: datos?.countsByStatus?.acceptedCountday | 0,
      },
      link: "complete",
    },
    {
      option: "Pending",
      component: (
        <Table
          columns={columns}
          data={datos.totalOrderPendingDay ? datos.totalOrderPendingDay : []}
        />
      ),
      icon: <MdOutlinePendingActions size={22} />,
      badge: {
        color: "warning",
        contex: datos?.countsByStatus?.pendingCountday | 0,
      },
      link: "pending",
    },
    {
      option: "Canceled",
      component: (
        <Table
          columns={columns}
          data={datos.totalOrderCanceledDay ? datos.totalOrderCanceledDay : []}
        />
      ),
      icon: <ImCancelCircle size={22} />,
      badge: {
        color: "danger",
        contex: datos?.countsByStatus?.cancelledCountday | 0,
      },
      link: "canceled",
    },
    {
      option: "Rejected",
      component: (
        <Table
          columns={columns}
          data={datos.totalOrderRejectedDay ? datos.totalOrderRejectedDay : []}
        />
      ),
      icon: <MdNoiseAware size={22} />,
      badge: {
        color: "default",
        contex: datos?.countsByStatus?.deliveredCountday | 0,
      },
      link: "rejected",
    },
  ];

  return (
    <>
      <PageTitleInit />
      <div className=" w-[98%] md:w-[95%] m-1 md:m-5">
        <TotalList
          active={datos?.countsByStatus?.pendingCount}
          complet={datos?.countsByStatus.acceptedCount}
          total={datos?.totalOrders}
          canceled={datos?.countsByStatus?.cancelledCount}
        />
      </div>
      <div className="m-1 md:m-5 bg-gradient-to-tr from-violet-200 to-rose-100 rounded-3xl ">
        <TabsNext
          onLinkChange={onLinkChange}
          variant="underlined"
          children={Datacomponent}
        />
      </div>
    </>
  );
};
