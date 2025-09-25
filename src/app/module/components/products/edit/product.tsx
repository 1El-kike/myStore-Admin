import React, { useMemo, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { port, PUBLIC_URL } from "../../../../../config/env";
import { NotItems } from "../../../widgets/datosvacios/NotItems";
import { FaProductHunt } from "react-icons/fa";
import { FcPaid } from "react-icons/fc";
import { LoadingProduct } from "../../../widgets/loading/loadingProduct";
import { StarRating } from "../../../widgets/startRating";
import { ErrorsItems } from "../../../errors/errorsItems";

interface TypeProduct {
  data: any;
  link?: string;
  Loading: boolean | undefined;
  error: any;
  text?: string;
  icon?: any;
}

export const ProductAll: React.FC<TypeProduct> = ({ data, link, Loading, error, text, icon }) => {


  const [searchTerm, setSearchTerm] = useState("");

  // Memoizar datos de autocompletado
  const autocompletItems = useMemo(() => {
    return (
      data?.map((item: any) => ({
        key: item.id?.toString() || item.product?.id?.toString(),
        label: item.name || item.product?.name || "",
      })) || []
    );
  }, [data]);

  // Filtrar items basado en el término de búsqueda
  const filteredItems = useMemo(() => {
    if (!searchTerm) return data;

    const lowerTerm = searchTerm.toLowerCase();
    return data.filter((item: any) => {
      const name =
        item.name?.toLowerCase() || item.product?.name?.toLowerCase() || "";
      return name.includes(lowerTerm);
    });
  }, [data, searchTerm]);

  // Manejar selección del autocompletado
  const handleSelectionChange = (key: string | null) => {
    if (!key) return;

    const selectedItem = autocompletItems.find((item: any) => item.key === key);
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
          onSelectionChange={(key: any) => handleSelectionChange(key)}
          inputValue={searchTerm}
        >
          {autocompletItems.map((item: any, index: number) => (
            <AutocompleteItem key={item.key + index} value={item.key}>
              {item.label}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>

      {error ? (
        <ErrorsItems />
      ) : Loading ? (
        <LoadingProduct />
      ) : data.length == 0 ? (
        <NotItems
          link={`/products/add/`}
          Icon={icon || FcPaid}
          role={['SUPER_ADMIN', 'ADMIN']}
          text={text || " There are not products that show. before of continue you should add Store in you Count."}
          next="In next link you would can create one"
        />
      ) : (
        <>

          {filteredItems?.map((item: any, index: number) => {
            const product = item.product || item;
            const status =
              product.inventoryStatus as keyof typeof statusClasses;
            const itemLink = !item.product
              ? `${link}${item?.id}`
              : `${item?.product?.id}`; /*  product.id ? `${link}${product.id}` : "#"; */

            return (
              <div key={item?.id + index || item?.product?.id + index} className="w-full hover:scale-[1.02] transition-transform">
                <Link
                  to={itemLink}
                >
                  <div className="p-2 m-3 rounded-2xl relative flex flex-wrap gap-4 bg-gradient-to-tr from-violet-100 to-rose-100">

                    <div className="flex flex-wrap items-start justify-between h-full w-full ">
                      <div className="  md:w-[35%] xl:w-[20%] h-full">
                        <img
                          src={
                            port +
                            (product.image ||
                              `${PUBLIC_URL}placeholder-product.png`)
                          }
                          className="w-40  h-40 rounded-xl"
                          alt={product.name}
                        />
                      </div>
                      <div className="w-full h-full md:w-[50%]">
                        <h1 className="font-bold text-danger text-2xl">
                          {product.name}
                        </h1>
                        <p className="line-clamp-3 text-center  mt-2 px-4">
                          {product.description}
                        </p>
                      </div>
                      <div className="flex w-full lg:w-[30%]  md:min-w-[250px] items-start">
                        <div className=" flex flex-col gap-4 items-start p-2 h-full">
                          <h3 className="font-bold text-rose-900">
                            $ {product.price}.00
                          </h3>
                          <StarRating rating={product.rating} size={23} />
                          <p>
                            Categoría: {product.category} - {product.tipo}
                          </p>
                          <p>Tipo de venta: {product.selling_type}</p>
                        </div>
                        <span
                          className={`${statusClasses[status]} absolute text-white right-0 -top-2 font-bold py-1 px-3 rounded-2xl shadow-lg shadow-gray-400`}
                        >
                          {product.inventoryStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
