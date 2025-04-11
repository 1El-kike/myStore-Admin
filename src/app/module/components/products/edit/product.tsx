import React, { useMemo, useState } from "react";
import { DataItem } from "../../orders/create/bodyModal";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { port } from "../../../../../config/env";

export const ProductAll: React.FC<any> = ({ data ,link}) => {
 
  
  const [searchTerm, setSearchTerm] = useState("");

  // Memoizar datos de autocompletado
  const autocompletItems = useMemo(() => {
    return data?.map((item:any) => ({
      key: item.id?.toString() || item.product?.id?.toString(),
      label: item.name || item.product?.name || "",
    })) || [];
  }, [data]);

  // Filtrar items basado en el término de búsqueda
  const filteredItems = useMemo(() => {
    if (!searchTerm) return data;
    
    const lowerTerm = searchTerm.toLowerCase();
    return data.filter((item:any) => {
      const name = item.name?.toLowerCase() || item.product?.name?.toLowerCase() || "";
      return name.includes(lowerTerm);
    });
  }, [data, searchTerm]);

  // Manejar selección del autocompletado
  const handleSelectionChange = (key: string | null) => {
    if (!key) return;
    
    const selectedItem = autocompletItems.find((item:any) => item.key === key);
    setSearchTerm(selectedItem?.label || "");
  };

  const statusClasses = {
    INSTOCK: "bg-gradient-to-tr from-green-500 to-green-300",
    LOWSTOCK: "bg-gradient-to-tr from-yellow-500 to-yellow-300",
    OUTOFSTOCK: "bg-gradient-to-tr from-rose-500 to-rose-300",
  };

  return (
    <div className="flex flex-col gap-4">
    <div className="flex justify-end">
      <Autocomplete
        className="max-w-xs"
        variant="underlined"
        aria-label="Buscar productos"
        label="Seleccionar producto"
        placeholder="Buscar producto..."
        onInputChange={setSearchTerm}
        onSelectionChange={(key:any) => handleSelectionChange(key)}
        inputValue={searchTerm}
     /*    onFilter={(items:any, filterValue:any) => 
          items.filter((item:any) => 
            item.label?.toLowerCase().includes(filterValue.toLowerCase())
          )
        } */
      >
        {autocompletItems.map((item:any) => (
          <AutocompleteItem key={item.key} value={item.key}>
            {item.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>

    {filteredItems?.map((item:any) => {
      const product = item.product || item;
      const status = product.inventoryStatus as keyof typeof statusClasses;
      const itemLink = product.id ? `${link}${product.id}` : "#";

      return (
        <Link
          key={product.id}
          className="w-full hover:scale-[1.02] transition-transform"
          to={itemLink}
        >
          <div className="p-2 m-3 rounded-2xl relative flex gap-4 bg-gradient-to-tr from-violet-100 to-rose-100">
            <img
              src={port + (product.image || "placeholder-product.png")}
              className="w-40 h-40 rounded-xl object-cover"
              alt={product.name}
            />
            
            <div className="flex flex-col justify-between w-full">
              <div>
                <h1 className="font-bold text-danger text-2xl">
                  {product.name}
                </h1>
                <p className="line-clamp-3 mt-2 px-4">
                  {product.description}
                </p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <h3 className="font-bold text-rose-900">
                    $ {product.price}.00
                  </h3>
                  <p>
                    Categoría: {product.category} - {product.tipo}
                  </p>
                  <p>Tipo de venta: {product.selling_type}</p>
                </div>

                <span className={`${statusClasses[status]} text-white font-bold py-1 px-3 rounded-2xl shadow-lg shadow-gray-400`}>
                  {product.inventoryStatus}
                </span>
              </div>
            </div>
          </div>
        </Link>
      );
    })}
  </div>
  );
};
