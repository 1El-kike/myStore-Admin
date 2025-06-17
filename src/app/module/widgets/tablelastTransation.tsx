import React, { useState } from "react";
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
import { EditIcon } from "../../utils/icons";
import { useDashboardData } from "../../service/useDashboardData";

export const columns = [
  { name: "NAME OF TRANSACTIONS", uid: "userName" },
  { name: "DATE", uid: "userAdress" },
  { name: "AMOUNT TYPE", uid: "amount" },
  { name: "STATUS", uid: "orderStatus" },
];

const statusColorMap: any = {
  DELIVERED: "success",
  CANCELLED: "danger",
  PENDING: "warning",
  ACCEPTED: "",
};

export const TablesLastTrans = ({ entityType }: { entityType: string }) => {
  // Obtener datos + estado de la query
  const { data, isLoading, isError } = useDashboardData(entityType);

  const renderCell = React.useCallback((datos: any, columnKey: any) => {
    const cellValue = datos[columnKey];

    switch (columnKey) {
      case "userName":
        return (
          <User
            // avatarProps={{radius: "lg", src: port + datos.imgStore}}
            description={datos.userPhoto}
            name={datos.userName}
          >
            {/*  {datos.email} */}
          </User>
        );
      case "userAdress":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-teal-400">
              +1 {datos.destination}
            </p>
            {/*    <p className="text-bold text-sm capitalize text-default-400">{datos.address}</p> */}
          </div>
        );
      case "orderStatus":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[datos.orderStatus]}
            size="sm"
            variant="flat"
          >
            {datos.orderStatus}
          </Chip>
        );
      case "amount":
        return <p>$ {Math.floor(datos.amount)}</p>;
      default:
        return cellValue;
    }
  }, []);

  // Muestra estados de carga y error
  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error cargando datos</div>;

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No rows to display."}
        items={data || []}
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
