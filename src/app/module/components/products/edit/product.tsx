import React, { useEffect, useMemo, useState } from "react";
import { DataItem } from "../../orders/create/bodyModal";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { port } from "../../../../../config/env";

export const ProductAll: React.FC<any> = ({ data ,link}) => {
  // Memoizar datos de autocompletado
  const autocomplet: Array<{ key: string | null; label: string | null }> =
    useMemo(
      () =>
        data?.map((item: DataItem) => ({
          key: item?.id || item?.product?.id,
          label: item.name || item?.product?.name,
        })) || [],
      [data]
    );

  const [items, setitems] = useState(data);
  const [lettle, setlettle] = useState("");

  const onSelectionChange = (value: any) => {
    console.log(value);
    setlettle(value);
  };

  useEffect(() => {
    if (data) {
      if (lettle.length > 0 && lettle != "") {
        setitems((prev: any) => {
          return prev.filter((e: any) => e.name.include(lettle));
        });
      }
    }
    console.log(lettle);
  }, [data, lettle]);

  const green = "bg-gradient-to-tr from-green-500 to-green-300";
  const warning = "bg-gradient-to-tr from-yellow-500 to-yellow-300";
  const danger = "bg-gradient-to-tr from-rose-500 to-rose-300";

  return (
    <>
      <div className="flex">
        <div className="mb-4 w-full flex mr-4 justify-end ">
          <Autocomplete
            className="max-w-xs"
            //  isInvalid={!!errors[index]} // <- Nueva prop
            // errorMessage={errors[index]} // <- Nueva prop
            isClearable={false}
            startContent={undefined}
            variant="underlined"
            selectedKey={data?.id?.toString()}
            defaultItems={autocomplet}
            onChange={onSelectionChange}
            //   onSelectionChange={(key) => onSelectionChange(key)}
            aria-label="search_products"
            label="Select products"
            placeholder="Search product..."
          >
            {(item) => (
              <AutocompleteItem key={item?.key}>{item?.label}</AutocompleteItem>
            )}
          </Autocomplete>
        </div>
      </div>
      {items?.map((e: any, i: number) => {
        
        return (
          <>

            <Link
            className="w-full"
              key={e?.id + i || e?.product?.id + i}
              to={ !e.product ? `${link}${e?.id}` : `${e?.product?.id}`}
            >
              <div className="p-2 hover:scale-110 duration-400 m-3 rounded-2xl relative flex gap-4 bg-red-50">
               { e?.product?.image ?
                <img
                  src={ port + e?.product.image }
                  className="w-32 h-auto"
                  alt=""
                />
                :
                <img
                src={port + e?.image }
                className="w-32 h-auto"
                alt=""
              />
            }
                <div className="flex">
                  <div>
                    <h1 className="font-bold text-danger text-2xl ">
                      {e?.name || e?.product?.name}
                    </h1>
                    <h2 className="w-96 line-clamp-3 mt-2 px-4">
                      {e?.description || e?.product?.description}
                    </h2>
                    <h3 className="mt-5 font-bold text-rose-900">
                      $ {e?.price || e?.product?.price}.00
                    </h3>
                  </div>
                  <div>
                    <h3>
                      {" "}
                      <span className="text-rose-900 font-bold">
                        Type Store :
                      </span>{" "}
                      {e?.selling_type || e?.prodcut?.selling_type}
                    </h3>
                    <p
                      className={`absolute text-white font-bold -top-1 py-1 px-3 rounded-2xl shadow-lg shadow-gray-400 -right-5 " ${
                        (e?.inventoryStatus == "INSTOCK" && green) ||
                        (e?.product?.inventoryStatus == "INSTOCK" && green)
                      } ${
                        (e?.inventoryStatus == "LOWSTOCK" && warning) ||
                        (e?.product?.inventoryStatus == "LOWSTOCK" && warning)
                      } ${
                        (e?.inventoryStatus == "OUTOFSTOCK" && danger) ||
                        (e?.product?.inventoryStatus == "OUTOFSTOCK" && danger)
                      }`}
                    >
                      {e?.inventoryStatus || e?.product?.inventoryStatus}
                    </p>
                    <p>
                      Category: {e?.category || e?.product.category} -{" "}
                      {e?.tipo || e?.product?.tipo}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </>
        );
      })}
    </>
  );
};
