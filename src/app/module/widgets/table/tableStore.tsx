import React, { FC, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import BottomContent from "./bottomContent";
import TopContent from "./topContent";
import { renderCell } from "./renderCell";
import { updateTable } from "../../core/filtertableandSearch";
import { useNavigate } from "react-router-dom";

export interface TypeColumns {
  name: string;
  uid: string;
}
interface TableData {
  columns: TypeColumns[];
  isDetails?: boolean;
  notId?: boolean
}

export const Tables: FC<TableData> = ({ columns, isDetails, notId }) => {
  const {
    setSortDescriptor,
    sortDescriptor,
    selectedKeys,
    setSelectedKeys,
    datosTable,
  } = updateTable();

  const topContent = <TopContent datos={datosTable} />;

  const navigate = useNavigate()


  const handleNavigate = (link: string, id: number) => {
    if (notId) {
      navigate(`${link}`, { state: { id: id } })
    } else {
      navigate(`${link}${id}`)
    }
  }

  const bottomContent = <BottomContent />;

  const render = useCallback((dato: any, columnKey: any) => {
    return renderCell(dato, columnKey, handleNavigate);
  }, []);

  return (
    <Table
      color="danger"
      selectionBehavior='toggle'
      onRowAction={() => { }}
      onSortChange={setSortDescriptor}
      sortDescriptor={sortDescriptor}
      bottomContentPlacement="outside"
      topContentPlacement="inside"
      topContent={isDetails && topContent}
      selectedKeys={isDetails ? selectedKeys : undefined}
      onSelectionChange={isDetails ? setSelectedKeys : undefined}
      bottomContent={isDetails ? bottomContent : null}
      selectionMode={isDetails ? "multiple" : "none"}
      aria-label="Example table with custom cells"
    >
      <TableHeader className="" columns={columns}>
        {(column) => (
          <TableColumn
            className="bg-gradient-to-t  from-rose-950 to-rose-900 text-white"
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No rows to display."}
        className=""
        items={datosTable}
      >
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey) =>
              <TableCell className="">
                {render(item, columnKey)}
              </TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
