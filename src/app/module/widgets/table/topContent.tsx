import { Button, Input } from "@nextui-org/react";
import { useMemo } from "react";
import { SearchIcon } from "../../../utils/icons";
import { FaPlus } from "react-icons/fa";
import {   DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface topContent {
    filterValue:any;
    onSearchChange:any;
    onRowsPerPageChange:any;
    datos:any;
    hasSearchFilter:any;
    onClear:any;
    filterTimeStart:any;
    filterTimeEnd:any;
    handleDatechange:any;
    handleDatechangeEnd:any;
}

const TopContent:React.FC<topContent> = ({ filterTimeEnd,filterTimeStart,filterValue,handleDatechangeEnd, onSearchChange,handleDatechange, onRowsPerPageChange, hasSearchFilter,onClear, datos}) => {

  const css = {
    textField: {
      sx: { 
       
        '& .MuiInputBase-input': {
          fontSize: '16px', // Cambia el tamaño de la fuente
          padding: '14px', // Cambia el paddin
          
          
        },
        '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent', // Quita los bordes del input
        background: '#f6f5f5',
         zIndex:-1,
        borderRadius: '15px', // Bordes redondeados
      },
      '& .MuiInputBase-inputAdornedEnd': {
        "&:focus":{
          borderRadius:'20px 0px 0px 20px'
        }
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#ff9a9e', // Color del borde al pasar el mouse
      },
      /*  */
      },
    },
  }


const Content = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-start " >
            
          <Input
            size="lg"
            className="w-full border-none  sm:max-w-[44%]"
            color="default"
            
            placeholder="Search customer or order number..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            
          />
      
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
      <div className="flex gap-4 justify-end w-full"> 



        <DateTimePicker
          label="Start Time"
          value={filterTimeStart}
          views={['year', 'month', 'day']}
          onChange={handleDatechange}
          className="rounded-2xl focus:border-none h-20"
          viewRenderers={{
            hours: null,
            minutes: null,
            seconds: null,
          }}
          slotProps={css}
          />
         <DateTimePicker
          label="End time"
          value={filterTimeEnd}
          onChange={handleDatechangeEnd}
          views={['year', 'month', 'day']}
          slotProps={css}
          className="rounded-2xl first:bg-black"
          viewRenderers={{
            hours: null,
            minutes: null,
            seconds: null,
          }}
          />
          </div>
          </DemoContainer>
          </LocalizationProvider>
        </div>
          <div className="flex  gap-3">
            <Button color="danger" endContent={<FaPlus />}>
              Import
            </Button>
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
