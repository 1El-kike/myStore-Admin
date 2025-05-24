import React from "react";
import { Table } from "flowbite-react";
import { ImUsers } from "react-icons/im";
import { FaRegCreditCard } from "react-icons/fa6";
import { MdOutlineInventory } from "react-icons/md";
import { Option } from "../../../../../interface/TypeTabs";
import { TabsNext } from "../../../widgets/tabs";
import { PUBLIC_URL } from "../../../../../config/env";
import { Image } from "@nextui-org/react";
import dayjs from "dayjs";
import { useDashboardData } from "../../../../hooks/useDashboardData";
import { formatCount } from '../../../../utils/formatCount'
import SalesComparisonChart from "./SalesComparisonChart ";
import { StoreTrafficList } from "./StoreTrafficCardProps ";
interface TypeData {
  entityType: string
}

export const Card: React.FC<TypeData> = ({ entityType }) => {

  const { data: dashboardData, isLoading, isError } = useDashboardData(entityType);

  const mony = formatCount(dashboardData?.totalAmount)



  const TarjetaCdredit = () => {

    // Muestra estados de carga y error
    if (isLoading) return <div>Cargando...</div>;
    if (isError) return <div>Error cargando datos</div>;

    return (
      <>
        <div className="pt-4 flex-col gap-10 md:gap-0 flex md:flex-row items-center mb-2 justify-around">
          {/* Tarjeta de credit */}
          <div className=" w-80 ">
            <div className="drop-shadow-2xl ">

              <Image
                isBlurred
                alt="Album Cover"
                className=""
                src={`${PUBLIC_URL}tarjeta-credito.png`}
                width={"100%"}
              />
            </div>
          </div>
          <div>
            <Table className="bg-transparent">
              <Table.Head className="">
                <Table.HeadCell className="bg-transparent text-2xl absolute -left-5 text-green-950 font-extrabold -top-9 line-clamp-1 w-full">
                  {`$ ${mony || "00.00"}`}
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent">
                  {dayjs().set('month', dayjs().month()).format("MMMM")}
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent">
                  {dayjs().set('month', dayjs().month() - 1).format("MMMM")}
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="">
                <Table.Row className="">
                  <Table.Cell className="py-1">Avaliable</Table.Cell>
                  <Table.Cell className="py-1 font-bold">$31,213</Table.Cell>
                  <Table.Cell className="py-1 font-bold">$82,456</Table.Cell>
                </Table.Row>
                <Table.Row className="">
                  <Table.Cell className="py-1">Credit limit</Table.Cell>
                  <Table.Cell className="py-1 font-bold">$12,000</Table.Cell>
                  <Table.Cell className="py-1 font-bold">$20,000</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="py-1">Credit used</Table.Cell>
                  <Table.Cell className="py-1 font-bold">$10,000</Table.Cell>
                  <Table.Cell className="py-1 font-bold">$0,00</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </>
    );
  };


  const DataTabs: Option[] = [
    { option: "Universal card", component: <TarjetaCdredit />, icon: <FaRegCreditCard size={22} />, link: '' },
    { option: "Inventory", component: <StoreTrafficList />, icon: <MdOutlineInventory size={22} />, link: '' },
    { option: "Personnel", component: <SalesComparisonChart />, icon: <ImUsers size={22} />, link: '' },
  ]

  return (
    <div className="mt-2  shadow-2xl shadow-zinc-400 flex w-full h-full rounded-2xl justify-center items-center bg-gradient-to-br from-rose-200 via-purple-100 to-purple-200">
      <div className="mb-auto w-full max-w-[800px] md:min-h-[330px] h-auto relative mr-auto">
        <TabsNext children={DataTabs} />
      </div>
    </div>
  );
};
