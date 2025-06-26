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
import { useNavigate } from "react-router-dom";
import { ViewDetailOrder } from "./detailorders";
import { NotItems } from "../../widgets/datosvacios/NotItems";
import { FcPaid } from "react-icons/fc";
import { useAuth } from "../../auth/core/Auth";
import { getRole } from "../../../utils/getRoles";

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

  const [link, setlink] = useState("all");

  const {
    page,
    filterTimeStart,
    filterTimeEnd,
    rowsPerPage,
    setlimit,
    filterValue,
    setdatosTable,
  } = updateTable();

  const { data, isLoadingData, errors } = useEjecut({
    url: `orders/summary?include=${link}&page=${page}&pageSize=${rowsPerPage}&filtertimeStart=${filterTimeStart}&filtertimeEnd=${filterTimeEnd}&filtervalue=${filterValue}`,
  });

  const onLinkChange = (link: string) => {
    setlink(link);
  };

  useEffect(() => {
    console.log(data)
    if (data) {
      setdatosTable(() => functionactions(data?.data[link].orders));
      if (data?.data[link]?.totalPages) {
        setlimit(data?.data[link]?.totalPages);
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

  const { currentUser } = useAuth();

  console.log(currentUser?.permission)

  const actions = (order: any) => {
    const editOrder = () => {
      navigate(`edit/${id}`);
    };
    const { id } = order;

    let result = {}

    if (currentUser?.permission.includes('READ_OWN')) {
      result = {
        urledit: {
          typeactions: "navigate",
          element: "edit/" + id,
        },
        ...(currentUser?.permission.includes('MANAGE_OWN') && { urldelite: "delite/" }),
        urlview: {
          typeactions: "modal",
          ...(order && { element: <ViewDetailOrder order={order} /> }),
          title: order.order.productName,
        },
      };
    } else {
      result = {
        urlview: {
          typeactions: "modal",
          ...(order && { element: <ViewDetailOrder order={order} /> }),
          title: order.order.productName,
        },
      }
    }

    return result
  };

  const functionactions = (data: any[]) => {
    const newData = data?.map((prev: any) => ({
      ...prev,
      actions: actions(prev),
    }));
    return newData;
  };

  const Datacomponent: Option[] = [
    {
      option: "All",
      component: <Table notID={true} columns={columns} notItem={true} isDetails={true} />,
      icon: <FaReplyAll size={22} />,
      badge: { color: "primary", contex: data?.countsByStatus.AllCount | 0 },
      link: "all",
    },

    {
      option: "Pending",
      component: <Table notID={true} columns={columns} notItem={true} isDetails={true} />,
      icon: <MdOutlinePendingActions size={22} />,
      badge: {
        color: "warning",
        contex: data?.countsByStatus?.pendingCount | 0,
      },
      link: "pending",
    },
    {
      option: "Accepted",
      component: <Table notID={true} columns={columns} notItem={true} isDetails={true} />,
      icon: <MdOutlineIncompleteCircle size={22} />,
      badge: {
        color: "success",
        contex: data?.countsByStatus?.acceptedCount | 0,
      },
      link: "accepted",
    },

    {
      option: "Delivering",
      component: <Table notID={true} columns={columns} notItem={true} isDetails={true} />,
      icon: <MdNoiseAware size={22} />,
      badge: {
        color: "default",
        contex: data?.countsByStatus?.deliveringCount | 0,
      },
      link: "delivering",
    },
    {
      option: "Delivered",
      component: <Table notID={true} columns={columns} notItem={true} isDetails={true} />,
      icon: <MdNoiseAware size={22} />,
      badge: {
        color: "secondary",
        contex: data?.countsByStatus?.deliveredCount | 0,
      },
      link: "delivered",
    },
    {
      option: "Cancelled",
      component: <Table notID={true} columns={columns} notItem={true} isDetails={true} />,
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
      {
        data?.sumary?.all == 0 ?
          <div className="mt-10 lg:mx-10 mx-2">
            <NotItems
              link={`/orders/create/`}
              Icon={FcPaid}
              text={" There are not orders that show. before of continue you should add orders in you Count. In next link you would can create one"}
            />
          </div>
          :
          <>
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
      }

    </>
  );
};
