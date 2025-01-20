import React from "react";
import { FaArrowDown, FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { Dropdown } from "flowbite-react";
import {Avatar} from "@nextui-org/react";
import { useAuth } from "../../core/AuthContext";
export const User = () => {
  const { user } = useAuth();

  return (
    <aside className="flex animate-opacity h-1/2 gap-5 flex-col flex-grow justify-center items-center">
      <div className="flex leading-none flex-col justify-center items-center flex-grow">
      <Avatar
      isBordered
        className="w-20 h-20 text-large"
        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
      />
        <p className="mt-2">Welcome back</p>
        <h1 className="font-bold text-3xl">{user?.user.name}</h1>
      </div>
      <div className="w-full">
        <div className="flex px-4 gap-3  items-center flex-col">
          <div className="border hover:scale-105 transition-all duration-300 flex justify-around items-center shadow-xl shadow-gray-400 rounded-lg h-20  bg-gradient-to-br from-slate-50 via-slate-100 to-sky-200 border-gray-300 w-3/4">
            <div className="bg-green-200 flex justify-center items-center rounded-full w-12 h-12">
              <FaArrowTrendUp />
            </div>
            <span>
              <p>Incorme</p>
              <p className="text-2xl">
                <b>$62,569</b>
              </p>
            </span>
            <div className="h-full flex justify-end w-1/3">
              <Dropdown
                placement="left-start"
                size="sm"
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <span className="flex cursor-pointer text-2xl font-extrabold">
                    ...
                  </span>
                )}
              >
                <Dropdown.Item>View details</Dropdown.Item>
                <Dropdown.Item>Share</Dropdown.Item>
                <Dropdown.Item>Download</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
          <div className="border hover:scale-105 transition-all duration-300 flex justify-around items-center h-20 shadow-xl rounded-lg shadow-gray-400 bg-gradient-to-br from-slate-50 via-slate-100 to-purple-200 border-gray-300 w-3/4">
            <div className="bg-red-200 flex justify-center items-center rounded-full w-12 h-12">
              <FaArrowTrendDown />
            </div>
            <span>
              <p>Expense</p>
              <p className="text-2xl">
                <b>$62,569</b>
              </p>
            </span>
            <div className="h-full items-start flex justify-end w-1/3">
            <Dropdown
                placement="left-start"
                size="sm"
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <span className="flex cursor-pointer text-2xl font-extrabold">
                    ...
                  </span>
                )}
              >
                <Dropdown.Item>View details</Dropdown.Item>
                <Dropdown.Item>Share</Dropdown.Item>
                <Dropdown.Item>Download</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
