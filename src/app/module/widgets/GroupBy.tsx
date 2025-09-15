import { port } from "../../../config/env";
import { Type_product } from "../components/products/type_product";
import { ErrorsItems } from "../errors/errorsItems";
import { NotItems } from "./datosvacios/NotItems";
import { Loading_items } from "./loading/loading_items";
import { Tables, TypeColumns } from "./table/tableStore";
import { FcShop } from "react-icons/fc";

interface TypeGroup {
  data?: any;
  notID?: boolean;
  link?: string;
  isDetails?: boolean;
  buttonClasses?: (string | undefined)[];
  fondoClasses?: string[];
  columns?: TypeColumns[];
  isLoadingData?: any;
  errors?: any;
  notItem?: any;
}

export const Group: React.FC<TypeGroup> = ({
  data,
  buttonClasses,
  fondoClasses,
  link,
  notID,
  isLoadingData,
  errors,
}) => {
  return (
    <div className=" flex gap-1 bg- lg:gap-4  flex-wrap">
      {errors ? <ErrorsItems /> : isLoadingData ? <Loading_items typeLoad="vertical" /> : data && data.length > 0 ? (
        data?.map((data: any, index: number) => {
          return (
            <>
              <div key={data.id + index} className="w-[100%] md:w-[50%] lg:w-[32%]   mt-12 animate-appearance-in duration-1000 h-60 ">
                <Type_product
                  link={link}
                  position="vertical"
                  idStore={data.id}
                  notID={notID}
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
                  title={`${data.name}`}
                  textsecondary="For more info look out page soport"
                  text={data.description}
                />
              </div>
            </>
          );
        })
      ) : (
        <NotItems
          link="/stores/add"
          text="There are no stores to display, you must first add a new store. Follow the link beloe to get started"
          Icon={FcShop}
        />
      )}

    </div>
  );
};

export const List: React.FC<TypeGroup> = ({
  data,
  buttonClasses,
  link,
  notID,
  fondoClasses,
  isLoadingData,
  errors,
}) => {
  return (
    <>
      <div className="">
        {errors ? (
          <ErrorsItems />
        ) : isLoadingData ? (
          <Loading_items typeLoad="horisontal" />
        ) : data?.length > 0 ? (
          data?.map((data: any, index: number) => {
            return (
              <>
                <div
                  key={data.id + data.name}
                  className="mt-16 animate-appearance-in relative"
                >
                  <Type_product
                    link={link}
                    notID={notID}
                    idStore={data.id}
                    scale="125"
                    button={
                      buttonClasses &&
                      buttonClasses[index % buttonClasses.length]
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
          })
        ) : (
          <NotItems
            link="/stores/add"
            text="There are no stores to display, you must first add a new store. Follow the link beloe to get started"
            Icon={FcShop}
          />
        )}
      </div>
    </>
  );
};

export const Table: React.FC<TypeGroup> = ({
  columns,
  isDetails,
  notID,
  isLoadingData,
  data,
  errors,
  notItem
}) => {
  const defaultcolumn = [
    { name: "STORES", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "SELLING TYPE", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];

  return (
    <>
      {errors ? (
        <ErrorsItems />
      ) : isLoadingData ? (
        <Loading_items typeLoad="Table" />
      ) : data && data?.length > 0 || notItem ? (
        <Tables
          isDetails={isDetails}
          columns={(columns && columns) || defaultcolumn}
          notId={notID}
        />
      ) : (
        <NotItems
          link="/stores/add"
          text="There are no stores to display, you must first add a new store. Follow the link beloe to get started"
          Icon={FcShop}
        />
      )}
    </>
  );
};
