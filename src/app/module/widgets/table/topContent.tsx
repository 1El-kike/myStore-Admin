import { Button, Input } from "@nextui-org/react";
import { useMemo } from "react";
import { SearchIcon } from "../../../utils/icons";
import { FaPlus } from "react-icons/fa";
import { TimeInput } from "../timeInput";
import { CalendarIcon } from "@mui/x-date-pickers";
import { Datepicker } from "flowbite-react";


interface topContent {
    filterValue:any;
    onSearchChange:any;
    onRowsPerPageChange:any;
    datos:any;
    hasSearchFilter:any;
    onClear:any;
}

const TopContent:React.FC<topContent> = ({ filterValue, onSearchChange, onRowsPerPageChange, hasSearchFilter,onClear, datos}) => {


  
const Content = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
            
          <Input
            size="lg"
            className="w-full h-20 border-none  sm:max-w-[44%]"
            color="default"
            
            placeholder="Search customer or order number..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            
          />
      
          <div className="flex gap-3">
            <Button color="danger" endContent={<FaPlus />}>
              Import
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {datos.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent border-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    onRowsPerPageChange,
    datos.length,
    hasSearchFilter,
  ]);
  return Content;
}

export default TopContent
