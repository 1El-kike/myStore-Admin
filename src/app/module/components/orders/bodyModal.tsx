import React, { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useEjecut } from '../../../hooks/useEjecut';
import { InputAutocomplet } from '../../widgets/InputAutocomplet';
import { FaObjectUngroup, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { MdRemove } from 'react-icons/md';
import { Autocomplete, AutocompleteItem, Avatar, AvatarGroup, Button, modal, Tooltip } from '@nextui-org/react';
import { port } from '../../../../config/env';

export type DataItem = {
  id: string | null;
  name: string | null;
};

interface TypeBodyModal {
    setdatosModal:any;
    datosModal:any;
}

export  const BodyModal:React.FC<TypeBodyModal> = ({setdatosModal,datosModal}) => {
    
    const { control, getValues ,setValue, watch, formState:{errors} } = useFormContext();    
    const { data } = useEjecut({ url: `allProducts` });
    const { fields, append, remove } = useFieldArray({
      control,
      name: "items",
    });

    // Observar items eficientemente
    const items = useWatch({ control, name: "items" });
    const lastItem = useMemo(() => items?.[items.length - 1], [items]);

    // Memoizar datos de autocompletado
    const autocomplet:Array<{ key: string | null; label: string | null }> = useMemo(
      () =>
        data?.map((item: DataItem) => ({
          key: item.id,
          label: item.name,
        })) || [],
      [data]
    );

    const addData = (newData: any, index: number) => {
      const formatData = {
        id: newData?.id,
        name: newData?.name,
        image: newData?.image,
        tipo: newData?.tipo,
        status: newData?.inventoryStatus,
        price: newData?.price,
        quantity: getValues(`items.${index}.quantity`),
      };
      setdatosModal((prev: any) => {
        const newModalData = [...prev];
        newModalData[index] = formatData; 
        return newModalData;
      });
    };


    useEffect(() => {
      const subscription = watch((value, { name }) => {
        if (name?.startsWith("items.") && name?.endsWith(".productId")) {
          const index = Number(name.split(".")[1]);
          const selectedProduct = data?.find(
            (item: DataItem) => item.id == value.items?.[index]?.productId
          );
          if (Object.keys(errors).length > 0) return;
        //  console.log("se agrego")
              addData(selectedProduct, index);
        }
         
        });
        
      return () => subscription.unsubscribe();
    }, [ data]);
    // Control de cantidad
    const moreQuantity = (index: number) => {
      const currentQuantity = getValues(`items.${index}.quantity`) || 1;
      setValue(`items.${index}.quantity`, Number(currentQuantity) + 1);
      // Actualizar datosModal usando el índice directo
      setdatosModal((prev: any) =>
        prev.map((item: any, i: number) =>
          i === index
            ? { ...item, quantity: Number(currentQuantity) + 1 }
            : item
        )
      );
    };

    const lessQuantity = (index: number) => {
      const currentQuantity = getValues(`items.${index}.quantity`) || 1;
      if (currentQuantity > 1) {
        setValue(
          `items.${index}.quantity`,
          Number(currentQuantity) - 1
        );
      }
      // Actualizar datosModal usando el índice directo
      setdatosModal((prev: any) =>
        prev.map((item: any, i: number) =>
          i === index
            ? { ...item, quantity: Number(currentQuantity) - 1 }
            : item
        )
      );
    };

    // Función para agregar productos con validación
    const addProduct = () => {
      if (!lastItem?.productId) return;
      append({ productId: null, quantity: 1, price: null });
    };

    // Función para eliminar o vaciar producto
    const handleRemove = (index: number) => {
      if (fields.length > 1) {
        setdatosModal((prev: any) =>
          prev.filter((_: any, i: number) => i !== index)
        ); // Eliminar del mismo índice
      } else {
        // Si solo queda un elemento, vaciamos sus campos
        setdatosModal([]);
      }
    };

    const [value, setvalueCampo] = useState(1)
    const handleSelection = (key: any,currentIndex:number) => {
      const isDuplicate = datosModal.some(
        (item:any, index:number) => item.productId === key && index !== currentIndex
      );
      if (isDuplicate) {
       
        // Mantener el valor anterior en el formulario
      
      } else {
      
        setvalueCampo(key);
      }
    };

    return (
      <>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex justify-between items-center mb-4"
          >
          {/*   <InputAutocomplet
              label="Select products"
              data={`items.${index}.productId`}
              dataAutocomplet={autocomplet}
              isClearable={false}
              existingItems={getValues("items")} // <-- Envía los items existentes
              currentIndex={index}
              placeholder="Search product..."
            /> */}
             <Autocomplete
          selectedKey={value}
          onSelectionChange={()=>handleSelection(field,index)}
          isInvalid={undefined}
          errorMessage="error"
          isRequired
          isClearable={false}
          className="max-w-xs"
          variant= "underlined"
          items={autocomplet}
          startContent={ undefined}
          aria-label="search_customer"        
          label="Select products"
          placeholder= "Search product..."
        >
            {(item) => (
            <AutocompleteItem key={item?.key}>{item?.label}</AutocompleteItem>
          )}
        </Autocomplete>

            {watch(`items.${index}.productId`) && (
              <div className="flex justify-center items-center gap-1 animate-appearance-in">
                <div
                  onClick={() => handleRemove(index)}
                  aria-label="Eliminar producto"
                  className="bg-gradient-to-br mr-1 hover:scale-110 duration-250 active:scale-95 focus:ring-2 cursor-pointer from-slate-500 to-slate-600 rounded-lg p-2"
                >
                  <FaTrashAlt color="white" />
                </div>
                <div
                  onClick={() => lessQuantity(index)}
                  aria-label="Reducir cantidad"
                  className="bg-gradient-to-br hover:scale-110 duration-250 active:scale-95 focus:ring-2 cursor-pointer from-slate-50 to-slate-200 rounded-lg p-1"
                >
                  <MdRemove size={24} />
                </div>
                <div className="mx-2 text-md">
                  {watch(`items.${index}.quantity`)}
                </div>
                <div
                  onClick={() => moreQuantity(index)}
                  aria-label="Aumentar cantidad"
                  className="bg-gradient-to-br hover:scale-110 active:scale-95 cursor-pointer duration-250 from-sky-500 to-violet-500 rounded-lg p-2"
                >
                  <FaPlus />
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="w-full flex items-center justify-between">
          {lastItem?.productId && (
            <div className="mb-5 mt-1">
              <Tooltip color="secondary" content="Add Product">

              <Button
                onPress={addProduct}
                className="animate-appearance-in"
                color="secondary"
                startContent={<FaPlus />}
                variant="shadow"
                >
                <FaObjectUngroup />
              </Button>
                </Tooltip>
            </div>
          )}
          <div className="w-full flex justify-end">
            <AvatarGroup isBordered>
              {datosModal.map((field: any) => (
                <>
                  <Avatar
                    className="w-20 h-20 text-large"
                    src={port + field.image}
                  />
                </>
              ))}
            </AvatarGroup>
          </div>
        </div>
        
      </>
    );
  };
