import { Chip, ChipProps, ScrollShadow, Tooltip, useDisclosure } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { EditIcon } from "../../../utils/icons";
import { useEjecut } from "../../../hooks/useEjecut";
import { port, PUBLIC_URL } from "../../../../config/env";
import { useNavigate } from "react-router-dom";
import { Cuenta } from "../../widgets/Cuenta";


interface TypeDetailOrder {
  title: string;
  isCustomer?: boolean;
  datos: any;
  tipo: "customer" | "product";
}

export const ViewDetailOrder = (order: any) => {


  console.log(order?.order)


  const statusColorMap: Record<string, ChipProps["color"]> = {
    ACCEPTED: "success",
    PENDING: "primary",
    DELIVERING: "secondary",
    DELIVERED: "success",
    CANCELLED: "danger",
  };

  const navigate = useNavigate();

  // Estado para almacenar los productos
  const [product, setProduct] = useState<any[]>([]);

  const [cuenta, setCuenta] = useState<any>([])

  // Procesar los datos cuando estén disponibles
  useEffect(() => {
    console.log(order?.order?.order)
    if (order) {
      setCuenta({
        discount: order.order.order.discount,
        shipping: order.order.order.shipping,
        taxrate: order.order.order.taxrate,
        subtotal: order.order.order.subtotal,
        total: order.order.order.total,
      })
      // Mapea los productos desde los datos recibidos
      //const product = itemsProduct(order?.order?.order?.storeOrders?.items)
      const itemsProduct = order?.order?.order?.storeOrders?.items.flatMap((product: any) =>
        product.map((item: any) => {
          return ({
            product: (
              <div key={item} className="flex justify-center gap-3 items-center">
                <img
                  className="w-10 h-10 rounded-xl"
                  src={`${port}${item?.imageProduct}`}
                  alt=""
                />
                <p>{item?.productName}</p>
              </div>
            ),
            quantity: item?.quantity,
            price: item?.price,
            amount: item?.price * item?.quantity,
          })
        })
      )
        ;
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
  }, [order]);

  let numPay = order?.order?.methodPayment?.numPay;
  let numPayStr = parseFloat(numPay).toString();
  let maskedNumPay = "***** " + numPayStr.slice(5);

  const ArrayCustomer = [
    { detail: "Customer", customer: order?.order?.customer?.customerName },
    {
      detail: "Address",
      customer: (
        <Tooltip color="default" content={order?.order.order.detinationProduct}>
          {order?.order.order.detinationProduct}
        </Tooltip>
      ),
    },
    { detail: "Date", customer: order?.order?.order?.fechaOrder },
    {
      detail: "Status", customer: (
        <Chip
          className="capitalize"
          color={
            statusColorMap[order?.order?.status]
          }
          size="sm"
          variant="flat"
        >
          {order?.order?.status}
        </Chip>
      )
    },
    {
      detail: "Payment method",
      customer: (
        <div className="flex items-center gap-3 w-full px-4 py-5">
          <img
            src={`${PUBLIC_URL}1.png`}
            className="w-9 h-9 shadow-lg shadow-slate-400 rounded-full"
            alt=""
          />
          <span>
            <p>{order?.order?.methodPayment?.tipoPay}</p>
            {order?.order?.methodPayment?.numPay === "N/A" ? (
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
  }: TypeDetailOrder) => {

    const handle = () => {
      console.log("entro")
      navigate(`edit/${order?.order?.id}`);
    }

    return (
      <>
        <div className=" flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          {isCustomer && (
            <Tooltip content="Edit">
              <span

                onClick={() => handle()}
                className="text-lg z-20 text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip>
          )}
        </div>
        <div
          className={`border rounded-xl w-full grid ${tipo === "customer" && "grid-cols-[repeat(2,minmax(0,1fr))]"
            } ${tipo === "product" && "grid-cols-5"
            }   justify-items-start items-center`}
        >
          {datos?.map((campo: any, index: number): any => {
            if (tipo === "customer") {
              return (
                <React.Fragment key={index}>
                  <div
                    className={` w-full text-gray-400 font-semibold flex items-center px-4 h-20  ${index == datos.length - 1
                      ? ""
                      : "border-b border-gray-300"
                      } `}
                  >
                    {campo?.detail}
                  </div>
                  <div
                    className={`w-full h-20 flex items-center  ${index == datos.length - 1
                      ? ""
                      : "border-b border-gray-300"
                      }`}
                  >
                    {campo?.customer}
                  </div>
                </React.Fragment>
              );
            } else if (tipo === "product") {
              return (
                <React.Fragment key={index}>
                  <div
                    className={`col-span-2 w-full ${index === 0
                      ? "text-gray-400 font-semibold"
                      : "text-slate-800"
                      } flex items-center px-4 h-20  ${index == datos.length - 1
                        ? ""
                        : "border-b border-gray-300"
                      } `}
                  >
                    {campo?.product}
                  </div>
                  <div
                    className={` w-full ${index === 0
                      ? "text-gray-400 font-semibold"
                      : "text-slate-800"
                      } flex items-center px-4 h-20  ${index == datos.length - 1
                        ? ""
                        : "border-b border-gray-300"
                      } `}
                  >
                    {campo?.quantity}
                  </div>
                  <div
                    className={` w-full ${index === 0
                      ? "text-gray-400 font-semibold"
                      : "text-slate-800"
                      } flex items-center px-4 h-20  ${index == datos.length - 1
                        ? ""
                        : "border-b border-gray-300"
                      } `}
                  >
                    {campo?.price}
                  </div>
                  <div
                    className={` w-full ${index === 0
                      ? "text-gray-400 font-semibold"
                      : "text-slate-800"
                      } flex items-center px-4 h-20  ${index == datos.length - 1
                        ? ""
                        : "border-b border-gray-300"
                      } `}
                  >
                    {campo?.amount}
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



  return (
    <>
      <div className="">
        <ScrollShadow hideScrollBar>
          <div className="h-[450px]">
            <Detail
              title="Details"
              isCustomer={true}
              datos={ArrayCustomer}
              tipo="customer"
            />
            <Detail title="Line items" datos={product} tipo="product" />
            <div className="pb-10 border-1 mt-4 px-3">

              <Cuenta discount={cuenta.discount} shipping={cuenta.shipping} subtotal={cuenta.subtotal} taxes={cuenta.taxrate} total={cuenta.total} />
            </div>
          </div>
        </ScrollShadow>
      </div>
    </>
  );
};


