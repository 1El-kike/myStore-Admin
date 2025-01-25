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
import { port } from "../../../config/env";
import { EditIcon } from "../../utils/icons";

export const columns = [
  {name: "NAME OF TRANSACTIONS", uid: "name"},
  {name: "DATE", uid: "role"},
  {name: "AMOUNT TYPE", uid: "status"},
  {name: "STATUS", uid: "actions"},
];

export const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
];


const statusColorMap:any  = {
  Online: "success",
  InStore: "danger",
  Mixto: "warning",
};

export const  TablesLastTrans = ({datos}:{datos:any}) => {

  const renderCell = React.useCallback((datos:any, columnKey:any) => {
    
    
    const cellValue =  datos[columnKey] ;

    switch (columnKey) {
      case "name":
        return (
          <User
           // avatarProps={{radius: "lg", src: port + datos.imgStore}}
            description={datos.email}
            name={cellValue}
          >
            {datos.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-teal-400">+1 {datos.phone}</p>
            <p className="text-bold text-sm capitalize text-default-400">{datos.address}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[datos.selling_type]} size="sm" variant="flat">
            {datos.selling_type }
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                {/* <TablesData /> */}
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Link to={`${datos.url}`}>
                <EditIcon />
                </Link>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
              {/*   <DeleteIcon /> */}
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table 
     aria-label="Example table with custom cells" >
      <TableHeader   columns={columns}>
        {(column) => (
          <TableColumn  key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody className="bg-gradient-to-br from-rose-400 to-purple-400" items={users}>
        {(item:any) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

