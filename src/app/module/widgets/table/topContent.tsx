import { Button, Input } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { DeleteIcon, SearchIcon } from "../../../utils/icons";
import { FaPlus } from "react-icons/fa";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FaCircleXmark } from "react-icons/fa6";

interface topContent {
  filterValue: any;
  onSearchChange: any;
  onRowsPerPageChange: any;
  datos: any;
  hasSearchFilter: any;
  onClear: any;
  filterTimeStart: any;
  filterTimeEnd: any;
  handleDatechange: any;
  handleDatechangeEnd: any;
  clearDate:()=> void;
}

const TopContent: React.FC<topContent> = ({
  filterTimeEnd,
  filterTimeStart,
  filterValue,
  handleDatechangeEnd,
  onSearchChange,
  handleDatechange,
  onRowsPerPageChange,
  hasSearchFilter,
  onClear,
  datos,
  clearDate,
}) => {
  const css = {
    textField: {
      sx: {
        "& .MuiInputBase-input": {
          fontSize: "16px", // Cambia el tamaño de la fuente
          padding: "14px", // Cambia el paddin
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent", // Quita los bordes del input
          background: "#f6f5f5",
          zIndex: -1,
          borderRadius: "15px", // Bordes redondeados
        },
        "& .MuiInputBase-inputAdornedEnd": {
          "&:focus": {
            borderRadius: "20px 0px 0px 20px",
          },
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ff9a9e", // Color del borde al pasar el mouse
        },
        /*  */
      },
    },
  };

  const Content = useMemo(() => {
    const start: dayjs.Dayjs = filterTimeStart?.toDate()?.getDate();
    const end: dayjs.Dayjs = filterTimeEnd?.toDate().getDate();
    const indexMonthStart: number = filterTimeStart?.toDate().getMonth();
    const indexMonthEnd: number = filterTimeEnd?.toDate().getMonth();
    let month = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
    const monthStart = month[indexMonthStart];
    const monthEnd = month[indexMonthEnd];
    const yearsStart: dayjs.Dayjs = filterTimeStart?.toDate().getFullYear();
    const yearsEnd: dayjs.Dayjs = filterTimeEnd?.toDate().getFullYear();


    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap justify-between gap-3 items-start ">
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
          <div className="-mt-2 grow">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
                <div className="flex gap-4  w-full">
                  <DateTimePicker
                    label="Start Time"
                    // value={filterTimeStart}
                    views={["year", "month", "day"]}
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
                    //  value={ filterTimeEnd}
                    onChange={handleDatechangeEnd}
                    views={["year", "month", "day"]}
                    slotProps={css}
                    className="rounded-2xl start:bg-black"
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
        </div>
        <div className="flex w-full justify-between gap-3">
         { filterTimeStart && filterTimeEnd ? <div className="flex justify-center items-center">
            <p className="font-bold">Date: </p>
            <p className="bg-gradient-to-t flex gap-2 items-center from-slate-100 to-slate-200 rounded-2xl ml-2 py-1 px-2">
              { start == end
                ? monthEnd == monthStart
                  ? yearsStart == yearsEnd
                    ? `${start} ${monthStart} ${yearsStart}`
                    : `${start} ${monthStart} ${yearsStart} - ${start} ${monthEnd} ${yearsEnd}`
                  : yearsStart == yearsEnd
                  ? `${start} ${monthStart} - ${end} ${monthEnd} ${yearsStart}`
                  : `${start} ${monthStart} ${yearsStart} - ${end} ${monthEnd} ${yearsEnd}`
                : monthStart == monthEnd
                ? yearsStart == yearsEnd
                  ? `${start} - ${end} ${monthStart} ${yearsStart}`
                  : `${start} ${monthStart} ${yearsStart} - ${end} ${monthEnd} ${yearsEnd}`
                : yearsStart == yearsEnd
                ? `${start} ${monthStart} - ${end} ${monthEnd} ${yearsStart}`
                : `${start} ${monthStart} ${yearsStart} - ${end} ${monthEnd} ${yearsEnd}`}
              <span onClick={clearDate} className="cursor-pointer transition-all duration-300 hover:bg-rose-300 rounded-full p-1">
                <FaCircleXmark />
              </span>
            </p>{" "}
            <div  className="text-2xl cursor-pointer p-2 hover:scale-110  ml-3 text-red-500">
              <DeleteIcon />
            </div>
          </div> : <span></span> }
          <Button className="right-0" color="danger" endContent={<FaPlus />}>
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
    filterTimeStart,
    filterTimeEnd,
    onSearchChange,
    onRowsPerPageChange,
    datos.length,
    hasSearchFilter,
  ]);
  return Content;
};

export default TopContent;
