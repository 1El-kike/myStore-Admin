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
}

export const Tables: FC<TableData> = ({ datos, columns }) => {

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
      pages={page}
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
      topContent={true && topContent}
      selectedKeys={true ? selectedKeys : undefined}
      onSelectionChange={true ? setSelectedKeys : undefined}
      bottomContent={true ? bottomContent : null}
      className=""
      selectionMode={true ? "multiple" : "none"}
      aria-label="Example table with custom cells"
    >
      <TableHeader columns={columns}>
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
        className="bg-gradient-to-br from-rose-400 to-purple-400"
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
