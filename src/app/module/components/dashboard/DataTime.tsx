import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { GoTriangleDown } from "react-icons/go";
//import { useCreateQuery } from "../../../hooks/useReactQuery";

export default function DateCalendarViews() {
  const [isCalendarVisible, setIsCalendarVisible] = React.useState(false); // Estado para controlar la visibilidad
  const [selectedDate, setSelectedDate] = React.useState(dayjs()); // Fecha seleccionada inicial

  React.useEffect(() => {
    // useCreateQuery("dataTime", {hola:""});
  }, [selectedDate.month(), selectedDate.year()]);


  return (
    <div
      className={`absolute ml-1  grow w-60 md:w-full  h-[310px] overflow-hidden ${isCalendarVisible && "z-20"
        }`}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={["DateCalendar", "DateCalendar", "DateCalendar"]}
        >
          <DemoItem>
            {isCalendarVisible && ( // Renderiza el calendario solo si es visible
              <DateCalendar
                disableFuture
                className="bg-gradient-to-bl rounded-3xl from-rose-200 to-violet-200"
                value={selectedDate} // Muestra la fecha seleccionada
                views={["month", "year"]}
                openTo="month"
                onChange={(newValue) => {
                  setSelectedDate(newValue); // Actualiza la fecha seleccionada
                  setIsCalendarVisible(false); // Oculta el calendario al seleccionar una fecha
                }}
              />
            )}
            {!isCalendarVisible && ( // Mensaje o acción después de seleccionar una fecha
              <div className="flex gap-4">
                <p className="text-base mt-5 ml-[26px]">
                  {selectedDate.format("MMMM YYYY")}
                </p>{" "}
                {/* Muestra solo mes y año */}
                <button
                  className=" mt-5 ml-[26px"
                  onClick={() => setIsCalendarVisible(true)}
                >
                  <GoTriangleDown />
                </button>
              </div>
            )}
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
