import { DatePicker } from "@nextui-org/react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { now, getLocalTimeZone, today, CalendarDate } from "@internationalized/date";

interface TypeCalendar {
  label: string;
  data:string;
  defaultValue?: 'yes' | 'no'; 
}

export const Calendary_Input: React.FC<TypeCalendar> = ({ label,data ,defaultValue,}) => {

  const { control, formState: { errors } } = useFormContext();

  return (
    <>
      <div className="flex flex-col justify-start gap-2 items-start  relative">
        <label
          htmlFor={label}
          className="block  capitalize text-base font-medium text-gray-900"
        >
          {label}
        </label>
        <Controller
        name={data}
        control={control}
        rules={{
          validate: (value) => {
            if (!value) return true; // Permitir campo opcional
            
            // Convertir a CalendarDate si es necesario
            const selectedDate = value as CalendarDate;
            const todayDate = today(getLocalTimeZone());
            
            if (selectedDate.compare(todayDate) < 0) {
              return "No puedes seleccionar una fecha anterior al día actual";
            }
            return true;
          }
        }}
        render={({field,fieldState}) => (
          <DatePicker
          hideTimeZone
          className="bg-white"
          defaultValue={defaultValue == 'yes' ? now(getLocalTimeZone()) : null}
          color="primary"
          radius="sm"
          onChange={(time) => field.onChange(time)}
          size="md"
          granularity="day"
          labelPlacement="outside"
          variant="faded"
          isInvalid={!!fieldState.error}
          errorMessage={fieldState.error?.message}
          minValue={today(getLocalTimeZone())} 
        />
        )}>
        </Controller>
         
      </div>
    </>
  );
};
