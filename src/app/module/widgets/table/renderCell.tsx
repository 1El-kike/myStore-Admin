import { Chip, ChipProps, Tooltip, User } from '@nextui-org/react';
import React, { useCallback } from 'react'
import { port } from '../../../../config/env';
import { Link } from 'react-router-dom';
import { DeleteIcon, EditIcon, TablesData } from '../../../utils/icons';

const statusColorMap: Record<string, ChipProps["color"]> = {
    Online: "success",
    InStore: "danger",
    Mixto: "warning",
    PENDING: "warning",
    ACCEPTED: "success",
    DELIVERING: "warning",
    DELIVERED: "warning",
    CANCELLED: "danger",
  };

export const renderCell = (datos: any, columnKey: any) => {
    const cellValue = datos[columnKey];
    //const cellValue = "name"

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
        const handleView:()=>void = datos.actions.urlview
        return (
          <div className="relative flex items-center gap-2">
            {handleView && (
              <Tooltip onClick={handleView} content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                 
                    <TablesData />
                 
                </span>
              </Tooltip>
            )}
            {datos?.actions?.urledit && (
              <Tooltip content="Edit">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Link to={`${datos.actions.urledit}${datos.id}`}>
                    <EditIcon />
                  </Link>
                </span>
              </Tooltip>
            )}
            {datos?.actions?.urldelite && (
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Link to={`${datos.actions.urldelite}${datos.id}`}>
                    <DeleteIcon />
                  </Link>
                </span>
              </Tooltip>
            )}
          </div>
        );
      default:
        return cellValue;
    }
}
  ;
