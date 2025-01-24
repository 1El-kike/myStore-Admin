import { ArrowLeftIcon } from "@mui/x-date-pickers";
import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaStore } from "react-icons/fa";
import {
  HiArrowSmRight,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import {  MdSpaceDashboard } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { CollapseSidebar } from "./collapseSidebar";
import { FaJediOrder } from "react-icons/fa6";

const custom = {
  root: {
    base: "h-full",
    inner:
      "bg-gradient-to-br py-5 px-2 h-screen from-slate-900 text-slate-800 to-rose-950 ",
  },
  item: {
    base: "flex items-center ml-5 justify-center rounded-lg p-2 text-base font-normal text-slate-300 transition-all duration-400 delay-400",
  },
  itemGroup: {
    base: "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 transition-all duration-400 delay-400",
  },
  logo: {
    base: "mb-5 flex items-center m-auto",
  },
  collapse: {
    button:
      "icon-error flex w-full items-center rounded-lg p-2 text-base font-normal",
    icon: {
      base: "h-6 w-6 text-gray-500 transition duration-75",
      open: {
        off: "",
        on: "text-gray-900",
      },
    },
  },
};

export const LayatSidebar = ({ setancho }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 758px)" });

  useEffect(() => {
    setancho(collapsed);
  }, [collapsed]);

  setancho(collapsed);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // No renderizar el sidebar si es móvil
  if (isMobile) {
    return null; // Oculta el sidebar en pantallas pequeñas
  }

  

  return (
    <div
      className={` ${
        collapsed ? " w-16 " : "w-64 t"
      } duration-400 z-40 transition-all ease-in-out `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Sidebar
        theme={custom}
        className={`${
          collapsed ? (hovered ? "w-64 " : "w-16 ") : "w-64 z-40"
        } z-50 duration-400 transition-all ease-in-out fixed `}
        aria-label="Sidebar with logo branding example "
      >
        <div className="relative">
          <Link to={""}>
            <Sidebar.Logo
              href=""
              img="/description/image(2).png"
              imgAlt="Flowbite logo"
              className="text-white relative"
            >
              {!collapsed ? "Stores" : hovered && "Stores"}
            </Sidebar.Logo>
          </Link>
          <button
            onClick={toggleSidebar}
            className="absolute py-1 z-50 px-2 bg-slate-200 -right-7 top-0 rounded-md cursor-pointer"
          >
            <ArrowLeftIcon className={`${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>
        <Sidebar.Items>
          <Sidebar.ItemGroup />
          <Sidebar.ItemGroup>
            <Link to={"dashboard"}>
              <Sidebar.Item href="" icon={MdSpaceDashboard}>
                {!collapsed ? "Dashboard" : hovered && "Dashboard"}
              </Sidebar.Item>
            </Link>
            <CollapseSidebar
              icon={HiShoppingBag}
              collapsed={collapsed}
              hovered={hovered}
              title="Products"
              collapseddata={[
                {link:"products",name:"List Products"},
                {link:"products",name:"Create Product"},
                {link:"products",name:"Shipping"},
                ]}
            />
            <CollapseSidebar
            icon={FaStore}
              collapsed={collapsed}
              hovered={hovered}
              title="Stores"
              collapseddata={[
                {link:"stores",name:"Stores Management "},
                {link:"stores/sales",name:"Stores Sales"},
                {link:"stores",name:"Inventory"},
                ]}
            />
             <CollapseSidebar
            icon={FaJediOrder}
              collapsed={collapsed}
              hovered={hovered}
              title="Orders"
              collapseddata={[
                {link:"orders/list",name:"List Order"},
                {link:"orders",name:"Create Order"},
                {link:"orders",name:"Order Details"},
                ]}
            />
            <Sidebar.Item
              href="#"
              icon={HiInbox}
              label={!collapsed ? "3" : hovered && "3"}
            >
              {!collapsed ? "Inbox" : hovered && "Inbox"}
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              {!collapsed ? "Users" : hovered && "Users"}
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiShoppingBag}>
              {!collapsed ? "sssss" : hovered && "ssssssss"}
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiArrowSmRight}>
              {!collapsed ? "Sign In" : hovered && "Sign In"}
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiTable}>
              {!collapsed ? "Sign Up" : hovered && "Sign Up"}
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};
