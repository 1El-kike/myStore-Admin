import { Tooltip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { EditIcon } from "../../../utils/icons";
import { useEjecut } from "../../../hooks/useEjecut";
import { port } from "../../../../config/env";
import { useNavigate } from "react-router-dom";

interface TypeDetailOrder {
  title: string;
  isCustomer?: boolean;
  datos: any;
  tipo: "customer" | "product";
}

interface Typedatos {
  detail?: string;
  customer?: any;
  product?: any;
  quantity?: number | string;
  price?: number | string;
  amount?: number | string;
}

export const ViewDetailOrder = (order: any) => {
  
  const { data } = useEjecut({ url: `orders/summary/${order.id}` });
  const navigate = useNavigate();
const [newdata, setnewData] = useState(order)
const [product, setproduct] = useState( {
  product: "Product",
  quantity: "Qty",
  price: "Unit Price",
  amount: "Amount",
})

useEffect(() => {
  if (data) {
    setnewData(data)
    console.log(newdata)
    const itemsProduct = data?.items?.map( (product:any) => {
      console.log(product)
      return {
        product: (
          <div className="flex justify-center gap-3 items-center">
            <img className="w-10 h-10 rounded-xl" src={`${port}${product.productImage}`} alt="" />
            <p>{product.productName}</p>
          </div>
        ),
        quantity: product.quantity,
        price: product.price,
        amount: product.amount,
      }
    })
    setproduct(prev => ({...prev,itemsProduct,name:"ssss"}))
    console.log(product)
  }
}, [data])
  

  const Customer = () => {
    let numPay = order.methodPayment.numPay;
    let numPayStr = parseFloat(numPay).toString();
    let maskedNumPay = "***** " + numPayStr.slice(5);

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
      { detail: "Status", customer: order.status },
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
    const ArrayProduct = [
      {
        product: "Product",
        quantity: "Qty",
        price: "Unit Price",
        amount: "Amount",
      },
      data?.items.map( (product:any) => {
        return {
          product: (
            <div className="flex justify-center gap-3 items-center">
              <img className="w-10 h-10 rounded-xl" src={`${port}${product.productImage}`} alt="" />
              <p>{product.productName}</p>
            </div>
          ),
          quantity: product.quantity,
          price: product.price,
          amount: product.amount,
        }
      }),
    ];

    const Detail = ({
      title,
      isCustomer = false,
      datos,
      tipo,
    }: TypeDetailOrder) => {
      return (
        <>
          <div className=" flex items-center justify-between">
            <h2 className="text-xl font-bold">{title}</h2>
            {isCustomer && (
              <Tooltip content="Edit">
                <span
                  onClick={() => navigate(`orders/edit/${order.id}`)}
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
            {datos.map((campo: any, index: number): any => {
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

              return <React.Fragment key={index}></React.Fragment>;
            })}
          </div>
        </>
      );
    };

    return (
      <>
        <div className="mt-[100px] flex flex-col gap-5">
          <Detail
            title="Details"
            isCustomer={true}
            datos={ArrayCustomer}
            tipo="customer"
          />
          <Detail title="Line items" datos={ArrayProduct} tipo="product" />
        </div>
      </>
    );
  };

  return {
    title: order.order.productName,
    component: <Customer />,
  };
};
