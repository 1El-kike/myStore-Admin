import React, { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { FaObjectUngroup, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { MdRemove } from 'react-icons/md';
import { Autocomplete, AutocompleteItem, Avatar, AvatarGroup, Button, modal, Tooltip } from '@nextui-org/react';
import { useEjecut } from '../../../../hooks/useEjecut';
import { port } from '../../../../../config/env';

export type DataItem = {
  id: string | null;
  name: string | null;
};

interface TypeBodyModal {
    setdatosModal: React.Dispatch<any>;
    datosModal:any
}

export  const BodyModal:React.FC<TypeBodyModal> = ({setdatosModal,datosModal}) => {
    
    const initialItems = [{ id: null, name: null, quantity: 1, price: null }];
    const [newDataModal, setnewDataModal] = useState<any[]>(initialItems);
    const [errors, setErrors] = useState<{ [key: number]: string }>({});
    const { data } = useEjecut({ url: `allProducts` });
  
    const lastItem = useMemo(() => newDataModal?.[newDataModal.length - 1], [newDataModal]); 

    // Memoizar datos de autocompletado
    const autocomplet:Array<{ key: string | null; label: string | null }> = useMemo(
      () =>
        data?.map((item: DataItem) => ({
          key: item.id,
          label: item.name,
        })) || [],
      [data]
    );

    const moreQuantity = (index: number) => {
      setnewDataModal(prev => 
        prev.map((item, i) => 
          i === index ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    };
    
    const lessQuantity = (index: number) => {
      setnewDataModal(prev => 
        prev.map((item, i) => 
          i === index && item.quantity > 1 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        )
      );
    };

    // Función para agregar productos con validación
    const addProduct = () => {
      setnewDataModal(prev => [...prev, { id: null, name: null, quantity: 1, price: null }]);
    };

    // Función para eliminar o vaciar producto
    const handleRemove = (index: number) => {
      if (newDataModal.length > 1) {
        setnewDataModal(prev => prev.filter((_, i) => i !== index));
      } else {
        setnewDataModal([{ id: null, name: null, quantity: 1, price: null }])
      }
    };
 
    const onSelectionChange = (key: React.Key | null, index: number) => {
      const selectedProduct = data?.find((item: any) => item.id == key);
      if (!selectedProduct) return;

     const isExistNow = newDataModal.some((item: any) => item.id === selectedProduct.id);
     const isExistModal = datosModal.some((item: any) => item.id === selectedProduct.id);
    
      if (isExistNow || isExistModal) {
        // Establecer error y limpiar selección
        setErrors(prev => ({ ...prev, [index]: "Producto ya agregado" }));
        setnewDataModal((prev:any) => {
          const newData = [...prev];
          newData[index] = { ...newData[index], id: null, name: null, quantity: 1, price: null };
          return newData;
        });
      } else {
        // Actualizar datos y limpiar error
        setnewDataModal(prev => {
          const newData = [...prev];
          newData[index] = {
            ...newData[index],
            id: selectedProduct.id,
            name: selectedProduct.name,
            image: selectedProduct.image,
            tipo: selectedProduct.tipo,
            status: selectedProduct.inventoryStatus,
            price: selectedProduct.price,
            quantity: newData[index]?.quantity || 1,
          };
          return newData;
        });
        setErrors((prev:any) => ({ ...prev, [index]: undefined }));
      }

    };

    useEffect(() => {
      setdatosModal((prev:any) => {
        // Crear un mapa de los datos existentes para actualizaciones eficientes
        const prevMap = new Map(prev.map((item:any) => [item.id, item]));
        
        // Procesar cada elemento de newDataModal
        const nuevosItems = newDataModal.reduce((acc, item) => {
          if (!item.id) return acc; // Ignorar items sin ID
    
          // Si el item ya existe, fusionar propiedades (incluyendo quantity)
          if (prevMap.has(item.id)) {
            const existente = prevMap.get(item.id)!;
            const actualizado = { ...existente, ...item };
            prevMap.set(item.id, actualizado);
          } else {
            prevMap.set(item.id, item);
          }
          
          return acc;
        }, prevMap);
    
        // Convertir el mapa de vuelta a array y filtrar nulls
        return Array.from(nuevosItems.values()).filter((item:any) => item.id !== null);
      });
    }, [newDataModal]);

    return (
      <>
        {newDataModal?.map((field:any, index:number) => (
          <div
            key={field.id}
            className="flex justify-between items-center mb-4"
          >
        <Autocomplete
        className="max-w-xs"  
        isInvalid={!!errors[index]}  // <- Nueva prop
        errorMessage={errors[index]} // <- Nueva prop
        isClearable={false}
        startContent={ undefined}
        variant= "underlined"
        selectedKey={newDataModal[index]?.id?.toString()}
        defaultItems={autocomplet}
        onSelectionChange={(key) => onSelectionChange(key, index)}
        aria-label="search_customer"        
        label="Select products"
        placeholder= "Search product..."
      >
        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
      </Autocomplete>

            {newDataModal[index].id != null && (
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
                  {
                    newDataModal[index].quantity
                  }
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
          {lastItem?.id && (
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
              {newDataModal.map((field: any) => (
                <>
                {field.id != null && 
                 <Avatar
                    className="w-20 h-20 text-large"
                    src={port + field.image}
                  />}
                </>
              ))}
            </AvatarGroup>
          </div>
        </div>
        
      </>
    );
  };
