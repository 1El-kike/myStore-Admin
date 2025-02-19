import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form';

interface TypeAutocomplete {
data : string;
label?:string;
placeholder?:string;
dataAutocomplet: Array<{ key: string | null; label: string | null }>;
}

export const InputAutocomplet:React.FC<TypeAutocomplete> = ({data,label,placeholder,dataAutocomplet}) => {

const { control, formState: { errors } } = useFormContext();

  return (
    <Controller
    name={data}
    control={control}
    defaultValue={null}
    render={({field}) => (
    <Autocomplete
      isRequired
      className="max-w-xs"
      variant='underlined'
      items={dataAutocomplet} 
      onSelectionChange={field.onChange}
      selectedKey={field.value}  
      label={label}
      placeholder={placeholder}
      errorMessage={errors[data]?.message as string}
    >
      {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
    </Autocomplete>
      )}>
        </Controller>
  )
}
