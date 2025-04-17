import React, { useEffect } from "react";
import { Group, List, Table } from "./GroupBy";
import { TollButtom } from "../components/products/tollBar";
import { useEjecut } from "../../hooks/useEjecut";
import { updateTable } from "../core/filtertableandSearch";
import { ProductAll } from "../components/products/edit/product";
import { NotItems } from "./datosvacios/NotItems";
import { FaProductHunt } from "react-icons/fa";

export const TabSelect = ({
  link,
  allData,
  notId,
  linkallData,
}: {
  link: string;
  allData?: string;
  notId?: boolean;
  linkallData?: string;
}) => {
  const buttonClasses = [
    "bg-gradient-to-tr to-violet-700 from-indigo-500",
    "bg-gradient-to-tr to-fuchsia-500 from-fuchsia-900",
    "bg-gradient-to-tr to-orange-500 from-orange-900",
    ,
  ];

  const fondoClasses = [
    "bg-gradient-to-tr to-blue-100 from-violet-100",
    "bg-gradient-to-tr to-rose-100 from-purple-100",
    "bg-gradient-to-tr to-orange-100 from-amber-100",
  ];

  const { data, isLoadingData, errors } = useEjecut({ url: "stores" });

  if (allData) {
    var {
      data: DataProduct,
      isLoadingData: LoadingProduct,
      errors: errorProduct,
    } = useEjecut({ url: allData });
  }

  const transformData = (data: any[]) => {
    return data?.map((item) => ({
      ...item,
      actions: {
        urledit: {
          typeactions: "navigate",
          element: link,
        },
      },
    }));
  };

  const transformedData = transformData(data);

  const { setdatosTable } = updateTable();

  useEffect(() => {
    setdatosTable(transformedData);
  }, [data]);
  // Resetear el contexto al salir de la página
  useEffect(() => {
    return () => {
      setdatosTable([]); // <-- Limpia los datos al desmontar
    };
  }, []);

  const option: any = [
    <List
      link={link}
      notID={notId}
      buttonClasses={buttonClasses}
      fondoClasses={fondoClasses}
      data={data}
      isLoadingData={isLoadingData}
      errors={errors}
    />,
    <Table
      buttonClasses={buttonClasses}
      fondoClasses={fondoClasses}
      notID={notId}
      data={data}
      isLoadingData={isLoadingData}
      errors={errors}
    />,
    <Group
      buttonClasses={buttonClasses}
      fondoClasses={fondoClasses}
      data={data}
      link={link}
      notID={notId}
      isLoadingData={isLoadingData}
      errors={errors}
    />,
    allData &&   <ProductAll data={DataProduct} link={linkallData} error={errorProduct} Loading={LoadingProduct} />
  ];

  return (
    <>
      <div className="w-full z-20 flex">
        <div className="my-4 relative md:w-[90%] px-2 w-full scroll-bar-none">
          <div className="w-full mb-10">
            <div className="bg--700">
              <TollButtom children={option} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
