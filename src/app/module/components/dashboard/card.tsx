import React from "react";
import { Table } from "flowbite-react";
import { ImUsers } from "react-icons/im";
import { FaRegCreditCard } from "react-icons/fa6";
import { MdOutlineInventory } from "react-icons/md";
import { Option } from "../../../../interface/TypeTabs";
import { TabsNext } from "../../widgets/tabs";

export const Card = () => {
  const TarjetaCdredit = () => {
    return (
      <>
        <div className="pt-4 flex-col gap-10 md:gap-0 flex md:flex-row items-center mb-2 justify-around">
          {/* Tarjeta de credit */}
          <div className=" w-80 ">
            <img
              src="/tarjeta-credito.png"
              className="drop-shadow-2xl "
              alt=""
            />
          </div>
          <div>
            <Table className="">
              <Table.Head className="">
                <Table.HeadCell className="bg-transparent text-2xl absolute -left-5 text-green-950 font-extrabold -top-9 line-clamp-1 w-full">
                  $1.234.767
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent">
                  Julio
                </Table.HeadCell>
                <Table.HeadCell className="bg-transparent">
                  Agost
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
  const DataTabs:Option[] = [
   { option:"Universal card",component:<TarjetaCdredit/>, icon:<FaRegCreditCard size={22}/>},
   { option:"Inventory",component:<TarjetaCdredit/>, icon:<MdOutlineInventory size={22} />},
   { option:"Personnel",component:<TarjetaCdredit/>, icon:<ImUsers size={22} /> },
  ]

  return (
    <div className="mt-2  shadow-2xl shadow-zinc-400 flex w-full h-full rounded-2xl justify-center items-center bg-gradient-to-br from-rose-200 via-purple-100 to-purple-200">
      <div className="mb-auto w-full relative mr-auto">
        <TabsNext children={DataTabs} />
        {/*  <span className='border-b-1 border-red-400'  /> */}
      </div>
    </div>
  );
};
