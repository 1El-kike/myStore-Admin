import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';

interface TypeAutocomplete {
data : string;
label?:string;
placeholder?:string;
dataAutocomplet: Array<{ key: string | null; label: string | null }>;
variant?:"flat" | "underlined" | "faded" | "bordered" | undefined
className?:string;
size?:"sm" | "md" | "lg" | undefined
}

export const InputAutocomplet:React.FC<TypeAutocomplete> = ({data,label,placeholder,dataAutocomplet,variant,className,size}) => {

const { control, formState: { errors } ,setValue} = useFormContext();

  return (
    <Controller
    name={data}
    control={control}
    defaultValue={null}
    render={({field}) => (
    <Autocomplete
      isRequired
      className={className || "max-w-xs"}
      variant={variant ||'underlined'}
      items={dataAutocomplet} 
      aria-label='search_customer'
      onSelectionChange={(key)=> {field.onChange(key) }}
      selectedKey={field.value}  
      label={label}
      size={size}
      placeholder={placeholder}
      errorMessage={errors[data]?.message as string}
    >
      {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
    </Autocomplete>
      )}>
        </Controller>
  )
}
