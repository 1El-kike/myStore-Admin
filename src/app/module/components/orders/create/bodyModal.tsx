import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaObjectUngroup, FaPlus, FaTrashAlt } from "react-icons/fa";
import { MdRemove } from "react-icons/md";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  AvatarGroup,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { useEjecut } from "../../../../hooks/useEjecut";
import { port } from "../../../../../config/env";
import { EditProduct } from "./editProduct";
import { updateTable } from "../../../core/filtertableandSearch";
import { useFormContext } from "react-hook-form";

export type DataItem = {
  id: string | null ;
  product?:{
    id:string  
    name:string
  }
  name: string | null;
};

interface TypeBodyModal {
  setdatosModal: React.Dispatch<any>;
  datosModal: any;
}

export const BodyModal: React.FC<TypeBodyModal> = ({
  setdatosModal,
  datosModal,
}) => {
  const initialItems = [{ id: null, name: null, quantity: 1, price: null }];
  const [newDataModal, setnewDataModal] = useState<any[]>(initialItems);
  const [errors, setErrors] = useState<{ [key: number]: string }>({});
  const [datosChildren, setdatosChildren] = useState([])
  const { data } = useEjecut({ url: `allProducts` });
  const { setdatosTable } = updateTable();

  const lastItem = useMemo(
    () => newDataModal?.[newDataModal.length - 1],
    [newDataModal]
  );

  // Memoizar datos de autocompletado
  const autocomplet: Array<{ key: string | null; label: string | null }> =
    useMemo(
      () =>
        data?.map((item: DataItem) => ({
          key: item.id,
          label: item.name,
        })) || [],
      [data]
    );

  const moreQuantity = (index: number) => {
    setnewDataModal((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const lessQuantity = (index: number) => {
    setnewDataModal((prev) =>
      prev.map((item, i) =>
        i === index && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Función para agregar productos con validación
  const addProduct = () => {
    setnewDataModal((prev) => [
      ...prev,
      { id: null, name: null, quantity: 1, price: null },
    ]);
  };

  // Función para eliminar o vaciar producto
  const handleRemove = (index: number) => {
    if (newDataModal.length > 1) {
      setnewDataModal((prev) => prev.filter((_, i) => i !== index));
    } else {
      setnewDataModal([{ id: null, name: null, quantity: 1, price: null }]);
    }
  };

  // 1. Crear callback memoizado
  const handleDatosHijo = useCallback((nuevosDatos: any) => {
    console.log("Datos recibidos del hijo:", nuevosDatos);
    setdatosChildren(nuevosDatos);
  }, []);

  const onSelectionChange = (key: React.Key | null, index: number) => {
    const selectedProduct = data?.find((item: any) => item.id == key);
    if (!selectedProduct) return;

    const isExistNow = newDataModal.some(
      (item: any) => item.id === selectedProduct.id
    );
    const isExistModal = datosModal.some(
      (item: any) => item.id === selectedProduct.id
    );

    if (isExistNow || isExistModal) {
      // Establecer error y limpiar selección
      setErrors((prev) => ({ ...prev, [index]: "Producto ya agregado" }));
      setnewDataModal((prev: any) => {
        const newData = [...prev];
        newData[index] = {
          ...newData[index],
          id: null,
          name: null,
          quantity: 1,
          price: null,
        };
        return newData;
      });
    } else {
      // Actualizar datos y limpiar error
      setnewDataModal((prev) => {
        const description = selectedProduct.description;
        const quantity_total = selectedProduct.quantity_total;
        const inventoryStatus = selectedProduct.inventoryStatus;
        const tipo = selectedProduct.tipo;
        const id = selectedProduct.id;
        const category = selectedProduct.category;
        const img = selectedProduct.image;
        const newData = [...prev];
        //para cuando el producto se halla acabado
        /*  if (selectedProduct.inventoryStatus !== "") {
          
        } */
        newData[index] = {
          ...newData[index],
          id: selectedProduct.id,
          name: selectedProduct.name,
          image: img,
          price: selectedProduct.price,
          quantity: newData[index]?.quantity || 1,
          actions: {
            urledit: {
              typeactions: "modal",
               onActionChange:(closeModal:any) => onActionChange(closeModal),
              element: (
                <EditProduct
                  quantity={newData[index].quantity}
                  id={id}
                  img={img}
                  category={category}
                  onActionChange={handleDatosHijo}
                  inventoryStatus={inventoryStatus}
                  tipo={tipo}
                  quantity_total={quantity_total}
                  description={description}
                />
              ),
              title: selectedProduct.name,
            },
          },
        };
        return newData;
      });
      setErrors((prev: any) => ({ ...prev, [index]: undefined }));
    }
  };
     const {setValue} = useFormContext();
  
  

  const onActionChange = (closeModal: () => void) => {
    const datoshijos:any = datosChildren
    console.log(datosChildren)
    if (datoshijos) {
      const itemsArray = datosModal.map((item: any) => 
        item.id === datoshijos.id ? { ...item, quantity:datoshijos.quantity } : item
      );
   /*  const itemsArray = datosModal.map((item: any) => (
      item.id === datoshijos.id && 
      {
      
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    })); */
    // Establecer el nuevo array en "items"
    setdatosTable(itemsArray);
    setValue("items", itemsArray);
    }
    closeModal();
    
  };

  useEffect(() => {
    setdatosModal((prev: any) => {
      // Crear un mapa de los datos existentes para actualizaciones eficientes
      const prevMap = new Map(prev.map((item: any) => [item.id, item]));

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
      return Array.from(nuevosItems.values()).filter(
        (item: any) => item.id !== null
      );
    });
  }, [newDataModal]);

  return (
    <>
      {newDataModal?.map((field: any, index: number) => (
        <div key={field.id} className="flex justify-between items-center mb-4">
          <Autocomplete
            className="max-w-xs"
            isInvalid={!!errors[index]} // <- Nueva prop
            errorMessage={errors[index]} // <- Nueva prop
            isClearable={false}
            startContent={undefined}
            variant="underlined"
            selectedKey={newDataModal[index]?.id?.toString()}
            defaultItems={autocomplet}
            onSelectionChange={(key) => onSelectionChange(key, index)}
            aria-label="search_customer"
            label="Select products"
            placeholder="Search product..."
          >
            {(item) => (
              <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>

          {newDataModal[index].id != null && (
            <div className="flex justify-center animate-appearance-in gap-1 items-center">
              <div
                onClick={() => handleRemove(index)}
                aria-label="Eliminar producto"
                className="bg-gradient-to-br p-2 rounded-lg active:scale-95 cursor-pointer duration-250 focus:ring-2 from-slate-500 hover:scale-110 mr-1 to-slate-600"
              >
                <FaTrashAlt color="white" />
              </div>
              <div
                onClick={() => lessQuantity(index)}
                aria-label="Reducir cantidad"
                className="bg-gradient-to-br p-1 rounded-lg active:scale-95 cursor-pointer duration-250 focus:ring-2 from-slate-50 hover:scale-110 to-slate-200"
              >
                <MdRemove size={24} />
              </div>
              <div className="text-md mx-2">{newDataModal[index].quantity}</div>
              <div
                onClick={() => moreQuantity(index)}
                aria-label="Aumentar cantidad"
                className="bg-gradient-to-br p-2 rounded-lg active:scale-95 cursor-pointer duration-250 from-sky-500 hover:scale-110 to-violet-500"
              >
                <FaPlus />
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-between w-full items-center">
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
        <div className="flex justify-end w-full">
          <AvatarGroup isBordered>
            {newDataModal.map((field: any) => (
              <>
                {field.id != null && (
                  <Avatar
                    className="h-20 text-large w-20"
                    src={port + field.image}
                  />
                )}
              </>
            ))}
          </AvatarGroup>
        </div>
      </div>
    </>
  );
};
