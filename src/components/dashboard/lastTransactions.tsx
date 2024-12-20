import { Table } from "flowbite-react";
import React from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Tables } from "../../elements/table";

export const LastTransactions = () => {
  return (
    <div className="animate-appearance-in">
      <div className="flex w-full my-4 mb-auto justify-between">
        <h1 className="text-2xl font-bold">Last Transactions</h1>
        <div>
          <button className="mt-1 flex justify-center items-center gap-2">
            View all <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="mt-3">
       <Tables/>
      </div>
    </div>
  );
};
