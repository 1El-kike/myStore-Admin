import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { port } from "../../../config/env";
import { Type_product } from "../components/products/type_product";
import { Tables, TypeColumns } from "./table/tableStore";
import { useEffect, useMemo, useState } from "react";
import { DataItem } from "../components/orders/create/bodyModal";
import { Link } from "react-router-dom";

interface TypeGroup {
  data?: any;
  link?: string;
  isDetails?: boolean;
  buttonClasses?: (string | undefined)[];
  fondoClasses?: string[];
  columns?: TypeColumns[];
}

export const Group: React.FC<TypeGroup> = ({
  data,
  buttonClasses,
  fondoClasses,
}) => {
  return (
    <div className=" flex mt-5 gap-4 flex-auto flex-wrap">
      {data?.map((data: any, index: number) => {
        return (
          <>
            <div className="w-[32%] mt-12 animate-appearance-in duration-1000 h-60 ">
              <Type_product
                link="/stores/edit/"
                position="vertical"
                key={data.id}
                idStore={data.id}
                scale="125"
                button={
                  buttonClasses && buttonClasses[index % buttonClasses.length]
                }
                fondo={
                  (fondoClasses && fondoClasses[index % fondoClasses.length]) ||
                  "bg-white"
                }
                image={`${port + data.imgPortada}`}
                title={`${data.name}`}
                textsecondary="For more info look out page soport"
                text={data.description}
              />
            </div>
          </>
        );
      })}
    </div>
  );
};

export const List: React.FC<TypeGroup> = ({
  data,
  buttonClasses,
  link,
  fondoClasses,
}) => {
  return (
    <>
      <div className="">
        {data?.map((data: any, index: number) => {
          return (
            <>
              <div className="mt-16 animate-appearance-in relative">
                <Type_product
                  link={link}
                  key={data.id}
                  idStore={data.id}
                  scale="125"
                  button={
                    buttonClasses && buttonClasses[index % buttonClasses.length]
                  }
                  fondo={
                    (fondoClasses &&
                      fondoClasses[index % fondoClasses.length]) ||
                    "bg-white"
                  }
                  image={`${port + data.imgPortada}`}
                  title={`Operating in Store ${data.name}`}
                  textsecondary="For more info look out page soport"
                  text={data.description}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export const Table: React.FC<TypeGroup> = ({ data, columns, isDetails }) => {
  const defaultcolumn = [
    { name: "STORES", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "SELLING TYPE", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  return (
    <>
      <Tables
        isDetails={isDetails}
        columns={(columns && columns) || defaultcolumn}
      />
    </>
  );
};

export const All: React.FC<TypeGroup> = ({ data }) => {
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

    const [items, setitems] = useState(data)
    const [lettle, setlettle] = useState('')

    const onSelectionChange = (value:any)=> {
      console.log(value)
      setlettle(value)
    }

    useEffect(() => {
      if (data) {
        if (lettle.length > 0 && lettle != '') {
          setitems((prev:any) => {
            return prev.filter((e:any) => e.name.include(lettle))
          })
        }
      }
      console.log(lettle)
    }, [data,lettle])
    
const green = 'bg-gradient-to-tr from-green-500 to-green-300'
const warning = 'bg-gradient-to-tr from-yellow-500 to-yellow-300'
const danger = 'bg-gradient-to-tr from-rose-500 to-rose-300'

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
            <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
          </div>
      </div>
      {items?.map((e: any) => {
        return (
          <>
          <Link to={ `${e.id}`}>
          <div className="p-2 hover:scale-110 duration-400 m-3 rounded-2xl relative flex gap-4 bg-red-50">


            <img src={port + e.image} className="w-32 h-auto" alt="" />
            <div className="flex">
              <div>
            <h1 className="font-bold text-danger text-2xl ">{e.name}</h1>
            <h2 className="w-96 line-clamp-3 mt-2 px-4">{e.description}</h2>
            <h3 className="mt-5 font-bold text-rose-900">$ {e.price}.00</h3>
              </div>
              <div>
            <h3 > <span className="text-rose-900 font-bold">Type Store :</span> {e.selling_type}</h3>
            <p className={`absolute text-white font-bold -top-1 py-1 px-3 rounded-2xl shadow-lg shadow-gray-400 -right-5 " ${e.inventoryStatus == 'INSTOCK' && green} ${e.inventoryStatus == 'LOWSTOCK' && warning} ${e.inventoryStatus == 'OUTOFSTOCK' && danger}`}>{e.inventoryStatus}</p>
            <p>Category: {e.category} - {e.tipo}</p>
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
