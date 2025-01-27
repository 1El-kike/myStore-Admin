import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
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
  Pagination,
  ChipProps,
  Selection,
  SortDescriptor,
  Button,
  Input,
} from "@nextui-org/react";
import BottomContent from "./bottomContent";
import TopContent from "./topContent";
import { renderCell } from "./renderCell";
import { filtertableandSearch } from "../../core/filtertableandSearch";

export interface TypeColumns {
  name: string;
  uid: string;
}
interface TableData {
  datos: any;
  columns: TypeColumns[];
  isDetails?:boolean
}

export const Tables: FC<TableData> = ({ datos, columns,isDetails }) => {

  const {
    onClear,
    onNextPage,
    onPreviousPage,
    onRowsPerPageChange,
    onSearchChange,
    selectedKeys,
    setSelectedKeys,
    setSortDescriptor,
    sortedItems,
    filterValue,
    hasSearchFilter,
    filteredItems,
    page,
    pages,
    sortDescriptor,
    setPage
  } = filtertableandSearch({datos:datos});

  const topContent = (
    <TopContent
      datos={datos}
      filterValue={filterValue}
      hasSearchFilter={hasSearchFilter}
      onClear={onClear}
      onRowsPerPageChange={onRowsPerPageChange}
      onSearchChange={onSearchChange}
    />
  );

  const bottomContent = (
    <BottomContent
      filteredItems={filteredItems}
      onNextPage={onNextPage}
      onPreviousPage={onPreviousPage}
      page={page}
      pages={pages}
      selectedKeys={selectedKeys}
      setPage={setPage}
    />
  );

  const render = useCallback((dato: any, columnKey: any) => {
    return renderCell(dato, columnKey);
  }, []);

  return (
    <Table
      color="danger"
      onSortChange={setSortDescriptor}
      sortDescriptor={sortDescriptor}
      bottomContentPlacement="outside"
      topContentPlacement="inside"
      topContent={isDetails && topContent}
      selectedKeys={isDetails ? selectedKeys : undefined}
      onSelectionChange={isDetails ? setSelectedKeys : undefined}
      bottomContent={isDetails ? bottomContent : null}
      className=""
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
        items={sortedItems}
      >
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{render(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
