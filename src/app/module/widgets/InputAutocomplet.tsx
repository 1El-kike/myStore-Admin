import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import React, { memo, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface TypeAutocomplete {
  data: string;
  label?: string;
  placeholder?: string;
  dataAutocomplet: Array<{ key: string | null; label: string | null }>;
  variant?: "flat" | "underlined" | "faded" | "bordered" | undefined;
  className?: string;
  size?: "sm" | "md" | "lg" | undefined;
  isClearable?: boolean;
  startContent?: any;
  existingItems?: Array<{ productId: string | null }>;
  currentIndex?: number; // Índice actual para edición
}

export const InputAutocomplet: React.FC<TypeAutocomplete> = memo(({
  data,
  label,
  placeholder,
  dataAutocomplet,
  variant,
  className,
  size,
  isClearable = true,
  startContent,
   existingItems = [],
  currentIndex,
}) => {

  const { control, setError, clearErrors, getValues } = useFormContext();


  return (
    <Controller
      name={data}
      control={control}
      defaultValue={null}
      rules={{
        validate: (value) => {
          const isDuplicate = existingItems.some(
            (item, index) => item.productId === value && index !== currentIndex
          );
          
          return !isDuplicate || "Este producto ya está en la lista";
        }
      }}
      render={({ field, fieldState }) => {
        const handleSelection = (key: any) => {
          const isDuplicate = existingItems.some(
            (item, index) => item.productId === key && index !== currentIndex
          );
          if (isDuplicate) {
            setError(data, {
              type: "manual",
              message: "¡Producto duplicado!",
            });
            // Mantener el valor anterior en el formulario
            field.onChange(getValues(data));
          } else {
            clearErrors(data);
            field.onChange(key);
          }
        };

        return (
          <Autocomplete
          selectedKey={field.value}
          onSelectionChange={handleSelection}
          isInvalid={!!fieldState.error}
          errorMessage={fieldState.error?.message}
          isRequired
          isClearable={isClearable}
          className={className || "max-w-xs" }
          variant={variant || "underlined"}
          items={dataAutocomplet}
          startContent={startContent ? startContent : undefined}
          aria-label="search_customer"        
          label={label}
          size={size}
          placeholder={placeholder}
        >
          {(item) => (
            <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
      )
    }}
    ></Controller>
  );
});
