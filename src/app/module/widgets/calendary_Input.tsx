import { DatePicker } from "@nextui-org/react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface TypeCalendar {
  label: string;
  data:string;
}

export const Calendary_Input: React.FC<TypeCalendar> = ({ label,data }) => {

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
        defaultValue={null}
        render={({field}) => (
          <DatePicker
          hideTimeZone
          className="bg-white"
          color="primary"
          radius="sm"
          onChange={(time) => field.onChange(time)}
          size="md"
          granularity="day"
          labelPlacement="outside"
          variant="faded"
        />
        )}>
        </Controller>
         
      </div>
    </>
  );
};
