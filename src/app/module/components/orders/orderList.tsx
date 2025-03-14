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
import { useNavigate } from "react-router-dom";;
import { ViewDetailOrder } from "./detailorders";
import { Chip, ChipProps, Tooltip } from "@nextui-org/react";
import { EditIcon } from "../../../utils/icons";
import { port } from "../../../../config/env";

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
      if (data?.data[link]?.totalPages) {
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

  const actions = (order: any) => {


     const editOrder = () => {
      navigate(`edit/${order.id}`);
    };

    /* const Customer = () => {
      let numPay = order.methodPayment.numPay;
      let numPayStr = parseFloat(numPay).toString();
      let maskedNumPay = "***** " + numPayStr.slice(5);

      const statusColorMap: Record<string, ChipProps["color"]> = {
        ACCEPTED: "success",
        PENDING:"primary",
        DELIVERING: "secondary",
        DELIVERED: "success",
        CANCELLED: "danger",
      };
  
      const ArrayCustomer = [
        { detail: "Customer", customer: order.customer.customerName },
        {
          detail: "Address",
          customer: (
            <Tooltip color="default" content="Calle 206 e/ 27 y 27A">
              Calle 206 e/ 27 y 27A
            </Tooltip>
          ),
        },
        { detail: "Date", customer: order.order.fechaOrder },
        { detail: "Status", customer: (
          <Chip
          className="capitalize"
          color={
            statusColorMap[order.status]
          }
          size="sm"
          variant="flat"
        >
          {order.status}
        </Chip>
        )},
        {
          detail: "Payment method",
          customer: (
            <div className="flex items-center gap-3 w-full px-4 py-5">
              <img
                src="/1.png"
                className="w-9 h-9 shadow-lg shadow-slate-400 rounded-full"
                alt=""
              />
              <span>
                <p>{order?.methodPayment?.tipoPay}</p>
                {order?.methodPayment?.numPay === "N/A" ? (
                  ""
                ) : (
                  <p className="text-slate-500">{maskedNumPay}</p>
                )}
              </span>
            </div>
          ),
        },
      ];
  
      const Detail = ({
        title,
        isCustomer = false,
        datos,
        tipo,
      }: any) => {
  
  const handle =()=> {
   
    navigate(`edit/${order.id}`);
  }

  
  
        return (
          <>
            <div className=" flex items-center justify-between">
              <h2 className="text-xl font-bold">{title}</h2>
              {isCustomer && (
                <Tooltip content="Edit">
                  <span
                  
                    onClick={()=> handle()}
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  >
                    <EditIcon />
                  </span>
                </Tooltip>
              )}
            </div>
            <div
              className={`border rounded-xl w-full grid ${
                tipo === "customer" && "grid-cols-[repeat(2,minmax(0,1fr))]"
              } ${
                tipo === "product" && "grid-cols-5"
              }   justify-items-start items-center`}
            >
              {datos?.map((campo: any, index: number): any => {
                if (tipo === "customer") {
                  return (
                    <React.Fragment key={index}>
                      <div
                        className={` w-full text-gray-400 font-semibold flex items-center px-4 h-20  ${
                          index == datos.length - 1
                            ? ""
                            : "border-b border-gray-300"
                        } `}
                      >
                        {campo.detail}
                      </div>
                      <div
                        className={`w-full h-20 flex items-center  ${
                          index == datos.length - 1
                            ? ""
                            : "border-b border-gray-300"
                        }`}
                      >
                        {campo.customer}
                      </div>
                    </React.Fragment>
                  );
                } else if (tipo === "product") {
                  return (
                    <React.Fragment key={index}>
                      <div
                        className={`col-span-2 w-full ${
                          index === 0
                            ? "text-gray-400 font-semibold"
                            : "text-slate-800"
                        } flex items-center px-4 h-20  ${
                          index == datos.length - 1
                            ? ""
                            : "border-b border-gray-300"
                        } `}
                      >
                        {campo.product}
                      </div>
                      <div
                        className={` w-full ${
                          index === 0
                            ? "text-gray-400 font-semibold"
                            : "text-slate-800"
                        } flex items-center px-4 h-20  ${
                          index == datos.length - 1
                            ? ""
                            : "border-b border-gray-300"
                        } `}
                      >
                        {campo.quantity}
                      </div>
                      <div
                        className={` w-full ${
                          index === 0
                            ? "text-gray-400 font-semibold"
                            : "text-slate-800"
                        } flex items-center px-4 h-20  ${
                          index == datos.length - 1
                            ? ""
                            : "border-b border-gray-300"
                        } `}
                      >
                        {campo.price}
                      </div>
                      <div
                        className={` w-full ${
                          index === 0
                            ? "text-gray-400 font-semibold"
                            : "text-slate-800"
                        } flex items-center px-4 h-20  ${
                          index == datos.length - 1
                            ? ""
                            : "border-b border-gray-300"
                        } `}
                      >
                        {campo.amount}
                      </div>
                    </React.Fragment>
                  );
                }
  
                return null;
              })}
            </div>
          </>
        );
      };
  
const { data } = useEjecut({ url: `orders/summary/${order.id}` });
  const navigate = useNavigate();

  // Estado para almacenar los productos
  const [product, setProduct] = useState<any[]>([]);

  // Procesar los datos cuando estén disponibles
  useEffect(() => {
    if (data && data.items) {
      // Mapea los productos desde los datos recibidos
      const itemsProduct = data.items.map((product: any) => ({
        product: (
          <div className="flex justify-center gap-3 items-center">
            <img
              className="w-10 h-10 rounded-xl"
              src={`${port}${product.productImage}`}
              alt=""
            />
            <p>{product.productName}</p>
          </div>
        ),
        quantity: product.quantity,
        price: product.price,
        amount: product.amount,
      }));

      // Actualiza el estado con los productos procesados
      setProduct([
        {
          product: "Product",
          quantity: "Qty",
          price: "Unit Price",
          amount: "Amount",
        },
        ...itemsProduct,
      ]);
    }
  }, [data]);

      return (
        <>
          <div className="">
            <div>
  
            <Detail
              title="Details"
              isCustomer={true}
              datos={ArrayCustomer}
              tipo="customer"
              />
            <Detail title="Line items" datos={product} tipo="product" />
              </div>
          </div>
        </>
      );
    };
   */


    return {
      urledit: 
      {
        typeactions:"navigate",
        element:`edit/${order.id}`
      },
      urldelite: "delite/",
      urlview: /* () => ViewDetailOrder */{
        typeactions:"modal",
       ...(order && {element: <ViewDetailOrder order={order} />} ) ,
        title:order.order.productName
      },
    };
  };
  


  const functionactions = (data: any[]) => {
    const newData = data.map((prev: any) => ({
      ...prev,
      actions: actions(prev),
    }));
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
