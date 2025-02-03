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
import { updateTable } from "../../core/filtertableandSearch";
import { Loading } from "../../widgets/Loading";

interface TypeData {
  orders:any[];
    totalCount:number;
    totalPages:number ;
    currentPage: number;
}
interface TypeOrder {
  sumary: {
    all: number;
    amount: number | string;
    accepted: number,
    cancelled: number,
    pending: number,
    delivered: number,
    delivering: number
  },   
  countsByStatus: {
    AllCount:number;
    pendingCount: number;
    acceptedCount: number;
    deliveringCount:number;
    deliveredCount: number;
    cancelledCount: number;
  };
  data:{
    all:TypeData;
    delivered:TypeData;
    delivering:TypeData;
    accepted:TypeData;
    pending:TypeData;
    cancelled:TypeData;
  }
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

  const  {page,filterTimeStart,filterTimeEnd,rowsPerPage,setlimit,filterValue} = updateTable()
  
  const { data, isLoadingData, errors } = useEjecut({
    url: `orders/sumary?include=${link}&page=${page}&pageSize=${rowsPerPage}&filtertimeStart=${filterTimeStart}&filtertimeEnd=${filterTimeEnd}&filtervalue=${filterValue}`,
  });

  
  
  const [datos, setDatos] = useState<TypeOrder | null>(null);
  
  const onLinkChange = (link: string) => {
    setlink(link);
  };
  
  useEffect(() => {
    if (data) {
    setDatos(data);
    if (data.data[link].totalPages) {    
      setlimit(data.data[link].totalPages)
    }   
  }
  }, [data,filterValue]);
  
  if (errors) {
    return <div className="w-full h-screen flex justify-center items-center">
      error...
    </div>
  }
 
  if (isLoadingData || !datos) {
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
          data={datos?.data?.all?.orders ? datos?.data?.all.orders : []}
          isDetails={true}
        />
      ),
      icon: <FaReplyAll size={22} />,
      badge: { color: "primary", contex: datos?.countsByStatus.AllCount | 0 },
      link: "all",
    },
    
    {
      option: "Pending",
      component: (
        <Table
          columns={columns}
          data={datos?.data?.pending?.orders ? datos?.data?.pending?.orders : []}
          isDetails={true}
        />
      ),
      icon: <MdOutlinePendingActions size={22} />,
      badge: {
        color: "warning",
        contex: datos?.countsByStatus?.pendingCount | 0,
      },
      link: "pending",
    },
    {
      option: "Accepted",
      component: (
        <Table
          columns={columns}
          data={datos?.data?.accepted?.orders ? datos?.data.accepted?.orders : []}
          isDetails={true}

        />
      ),
      icon: <MdOutlineIncompleteCircle size={22} />,
      badge: {
        color: "success",
        contex: datos?.countsByStatus?.acceptedCount | 0,
      },
      link: "accepted",
    },
    
    {
      option: "Delivering",
      component: (
        <Table
          columns={columns}
          data={datos?.data?.delivering?.orders ? datos.data?.delivering?.orders : []}
          isDetails={true}
        />
      ),
      icon: <MdNoiseAware size={22} />,
      badge: {
        color: "default",
        contex: datos?.countsByStatus?.deliveringCount | 0,
      },
      link: "delivering",
    },
    {
      option: "Delivered",
      component: (
        <Table
          columns={columns}
          data={datos?.data?.delivered?.orders ? datos.data?.delivered?.orders : []}
          isDetails={true}
        />
      ),
      icon: <MdNoiseAware size={22} />,
      badge: {
        color: "secondary",
        contex: datos?.countsByStatus?.deliveredCount | 0,
      },
      link: "delivered",
    },
    {
      option: "Cancelled",
      component: (
        <Table
          columns={columns}
          data={datos?.data?.cancelled?.orders ? datos?.data?.cancelled?.orders : []}
          isDetails={true}
        />
        
      ),
      icon: <ImCancelCircle size={22} />,
      badge: {
        color: "danger",
        contex: datos?.countsByStatus?.cancelledCount | 0,
      },
      link: "cancelled",
    },
   
  ];

  return (
    <>
      <PageTitleInit />
      <div className=" w-[98%] md:w-[95%] filter contrast-150 m-1 md:m-5">
        <TotalList
          active={datos?.sumary.pending + datos?.sumary?.accepted + datos.sumary.delivering}
          complet={datos?.sumary.delivered}
          total={datos?.sumary.all}
          canceled={datos?.sumary.cancelled}
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
