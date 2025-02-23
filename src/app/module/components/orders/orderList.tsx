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
} from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useEjecut } from "../../../hooks/useEjecut";
import { updateTable } from "../../core/filtertableandSearch";
import { Outlet, useNavigate } from "react-router-dom";
import { Modal_Component } from "../../widgets/modal";
import { Tooltip } from "flowbite-react";
import { EditIcon } from "../../../utils/icons";
import { ViewDetailOrder } from "./detailorders";

interface TypeData {
  orders: any[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}
interface TypeOrder {
  sumary: {
    all: number;
    amount: number | string;
    accepted: number;
    cancelled: number;
    pending: number;
    delivered: number;
    delivering: number;
  };
  countsByStatus: {
    AllCount: number;
    pendingCount: number;
    acceptedCount: number;
    deliveringCount: number;
    deliveredCount: number;
    cancelledCount: number;
  };
  data: {
    all: TypeData;
    delivered: TypeData;
    delivering: TypeData;
    accepted: TypeData;
    pending: TypeData;
    cancelled: TypeData;
  };
}

export const OrderList = () => {

  const navigate = useNavigate();

  const columns = [
    { name: "ORDER", uid: "order" },
    { name: "PAYMENT METHOD", uid: "methodPayment" },
    { name: "CUSTOMER", uid: "customer" },
    { name: "STATUS", uid: "status" },
    { name: "", uid: "actions" },
  ];

  const [link, setlink] = useState("allday");

  const {
    page,
    filterTimeStart,
    filterTimeEnd,
    rowsPerPage,
    setlimit,
    filterValue,
    setdatosTable,
    datosTable
  } = updateTable();

  const { data, isLoadingData, errors } = useEjecut({
    url: `orders/summary?include=${link}&page=${page}&pageSize=${rowsPerPage}&filtertimeStart=${filterTimeStart}&filtertimeEnd=${filterTimeEnd}&filtervalue=${filterValue}`,
  });

  const onLinkChange = (link: string) => {
    setlink(link);
  };

  useEffect(() => {
    if (data) {
      setdatosTable(() => functionactions(data?.data[link].orders));
      if (data.data[link].totalPages) {
        setlimit(data.data[link].totalPages);
      }
    }
    //return datosTable.unSudcribe()
  }, [data, filterValue]);

  if (errors) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        error...
      </div>
    );
  }

  if (isLoadingData || !data) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    ); // Mostrar un mensaje de carga mientras no haya data
  }

  const actions = (id: any) => {


     const editOrder = () => {
      navigate(`edit/${id}`);
    };

    return {
      urledit: editOrder,
      urldelite: "delite/",
      urlview: () => ViewDetailOrder,
    };
  };
  


  const functionactions = (data: any[]) => {
    const newData = data.map((prev: any) => ({
      ...prev,
      actions: actions(prev.id),
    }));
    console.log(newData);
    return newData;
  };

  const Datacomponent: Option[] = [
    {
      option: "All",
      component: <Table columns={columns} isDetails={true} />,
      icon: <FaReplyAll size={22} />,
      badge: { color: "primary", contex: data?.countsByStatus.AllCount | 0 },
      link: "all",
    },

    {
      option: "Pending",
      component: <Table columns={columns} isDetails={true} />,
      icon: <MdOutlinePendingActions size={22} />,
      badge: {
        color: "warning",
        contex: data?.countsByStatus?.pendingCount | 0,
      },
      link: "pending",
    },
    {
      option: "Accepted",
      component: <Table columns={columns} isDetails={true} />,
      icon: <MdOutlineIncompleteCircle size={22} />,
      badge: {
        color: "success",
        contex: data?.countsByStatus?.acceptedCount | 0,
      },
      link: "accepted",
    },

    {
      option: "Delivering",
      component: <Table columns={columns} isDetails={true} />,
      icon: <MdNoiseAware size={22} />,
      badge: {
        color: "default",
        contex: data?.countsByStatus?.deliveringCount | 0,
      },
      link: "delivering",
    },
    {
      option: "Delivered",
      component: <Table columns={columns} isDetails={true} />,
      icon: <MdNoiseAware size={22} />,
      badge: {
        color: "secondary",
        contex: data?.countsByStatus?.deliveredCount | 0,
      },
      link: "delivered",
    },
    {
      option: "Cancelled",
      component: <Table columns={columns} isDetails={true} />,
      icon: <ImCancelCircle size={22} />,
      badge: {
        color: "danger",
        contex: data?.countsByStatus?.cancelledCount | 0,
      },
      link: "cancelled",
    },
  ];

  return (
    <>
      <PageTitleInit />
      <div className=" w-[98%] md:w-[95%] filter contrast-150 m-1 md:m-5">
        <TotalList
          active={
            data?.sumary.pending +
            data?.sumary?.accepted +
            data.sumary.delivering
          }
          complet={data?.sumary.delivered}
          total={data?.sumary.all}
          canceled={data?.sumary.cancelled}
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
