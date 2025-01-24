import React, { FC, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { port } from "../../../config/env";

export const TablesData = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const DeleteIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const EditIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

const statusColorMap: any = {
  Online: "success",
  InStore: "danger",
  Mixto: "warning",
  PENDING: "warning",
  ACCEPTED: "success",
  DELIVERING: "warning",
  DELIVERED: "warning",
  CANCELLED: "danger",
};

export interface TypeColumns {
  name: string;
  uid: string;
}
interface TableData {
  datos: any;
  columns: TypeColumns[];
}

export const Tables: FC<TableData> = ({ datos, columns }) => {
  const renderCell = React.useCallback((datos: any, columnKey: any) => {
    const cellValue = datos[columnKey];
    //const cellValue = "name"
    console.log(datos);
    /* 
{
      productName: 'ORD-0',
      priceProduct: 45.94,
      cantidad: 6,
      fechaOrder: '2025-01-22T12:28:06.399Z',
      methodPayment: { tipoPay: 'N/A', numPay: 'N/A' },
      customer: {
        customerName: 'enrique',
        customerImg: 'Img',
        customerEmail: 'Email'
      },
      status: 'CANCELLED'
    },
    */
    switch (columnKey) {
      case "order":
        const fechaOriginal = datos.order?.fechaOrder;
        const fecha = new Date(fechaOriginal);

        const dia = String(fecha.getDate()).padStart(2, "0"); // Asegura que el día tenga 2 dígitos
        const mesesAbreviados = [
          "ene",
          "feb",
          "mar",
          "abl",
          "myo",
          "jun",
          "jul",
          "ago",
          "sep",
          "oct",
          "nov",
          "dic",
        ];
        const mes = mesesAbreviados[fecha.getMonth()];
        // Formatear la salida

        return (
          <div className="flex items-center gap-3">
            <span className="bg-slate-100 py-1 px-2 rounded-xl">
              <p className="uppercase font-light">{mes}</p>
              <p className="font-semibold text-lg">{dia}</p>
            </span>
            <div>
              <p className="font-semibold"> {datos.order?.productName}</p>
              <span className="flex">
                <p className="text-slate-500">
                  {datos.order?.cantidad + " products - "}
                </p>
                <p>{"$" + Math.floor(datos.order?.priceProduct)}</p>
              </span>
            </div>
          </div>
        );
      case "methodPayment":
        let numPay = datos.methodPayment.numPay;
        let numPayStr = parseFloat(numPay).toString();
        let maskedNumPay = "***** " + numPayStr.slice(5);
        return (
          <div className="flex items-center gap-3">
            <img
              src="/1.png"
              className="w-9 h-9 shadow-lg shadow-slate-400 rounded-full"
              alt=""
            />
            <span>
              <p>{datos?.methodPayment?.tipoPay}</p>
              {datos?.methodPayment?.numPay === "N/A" ? (
                ""
              ) : (
                <p className="text-slate-500">{maskedNumPay}</p>
              )}
            </span>
          </div>
        );
      case "customer":
        let numero = datos.customer.customerIphone;

        // Dividir el número en las partes deseadas
        let parte1 = numero.slice(0, 2);
        let parte2 = numero.slice(2, 4);
        let parte3 = numero.slice(4, 7);
        let parte4 = numero.slice(7);
        return (
          <div className="flex items-center gap-3">
            <img
              src={datos.customer.customerImg || "/avatar/perfil.png"}
              className="w-9 h-9 shadow-lg shadow-slate-400 rounded-full"
              alt=""
            />
            <div>
              <p className="font-semibold">{datos.customer.customerName}</p>
              <p className="text-slate-500">{`${parte1}+ ${parte2} ${parte3} ${parte4}`}</p>
            </div>
          </div>
        );
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: port + datos.imgStore }}
            description={datos.email}
            name={cellValue}
          >
            {datos.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-teal-400">
              +1 {datos.phone}
            </p>
            <p className="text-bold text-sm capitalize text-default-400">
              {datos.address}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={
              statusColorMap[datos.selling_type] || statusColorMap[datos.status]
            }
            size="sm"
            variant="flat"
          >
            {datos.selling_type || datos.status}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                 <TablesData /> 
              </span>
            </Tooltip>
            <Tooltip content="Edit">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Link to={`/stores/edit/${datos.id}`}>
                  <EditIcon />
                </Link>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                   <DeleteIcon /> 
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader  columns={columns}>
        {(column) => (
          <TableColumn
          className="bg-gradient-to-t from-rose-950 to-rose-900 text-white"
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        className="bg-gradient-to-br from-rose-400 to-purple-400"
        items={datos}
      >
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
