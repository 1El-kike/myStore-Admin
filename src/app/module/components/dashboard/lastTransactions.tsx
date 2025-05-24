import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { TablesLastTrans } from "../../widgets/tablelastTransation";
import { Entity } from "../../../../interface/typeswebSocket";
import { Button } from "@nextui-org/react";

interface DataTable {
  entityType: string
}

export const LastTransactions = ({ entityType }: DataTable) => {

  return (
    <div className="animate-appearance-in">
      <div className="flex w-full my-4 mb-auto justify-between">
        <h1 className="text-2xl  font-bold">Last Transactions</h1>
        <div>
          {/*  <button className="relative py-2 px-4 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ">

          </button> */}
          <Button
            color="danger"
          >
            View all <FaArrowRight />
          </Button>

        </div>
      </div>
      <div className="mt-3">
        <TablesLastTrans entityType={entityType} />
      </div>
    </div>
  );
};
