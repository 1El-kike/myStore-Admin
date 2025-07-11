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
import { MdSpaceDashboard } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { CollapseSidebar } from "./collapseSidebar";
import { FaJediOrder } from "react-icons/fa6";
import { PUBLIC_URL } from "../../../../config/env";
import { useAuth } from "../../auth/core/Auth";


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

  const { currentUser } = useAuth();
  //validacion para saber que role tiene el usuario
  function hasExactRole(roles: string[], target: string): boolean {
    return roles.includes(target);
  }
  const admin = hasExactRole([currentUser?.role] as string[], "ADMIN");
  const super_admin = hasExactRole([currentUser?.role] as string[], "SUPER_ADMIN");

  return (
    <div
      className={` ${collapsed ? " w-16 " : "w-64 t"
        } duration-400 z-40 transition-all ease-in-out `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Sidebar
        theme={custom}
        className={`${collapsed ? (hovered ? "w-64 " : "w-16 ") : "w-64 z-40"
          } z-50 duration-400 transition-all ease-in-out fixed `}
        aria-label="Sidebar with logo branding example "
      >
        <div className="relative">
          <Link to={""}>
            <Sidebar.Logo
              href=""
              img={`${PUBLIC_URL}description/image(2).png`}
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
            {""} <ArrowLeftIcon className={`${collapsed ? "rotate-180" : ""}`} />
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
                ...(admin ? [{ link: "products", name: "Product Management", id: 8 }] : []),
                { link: "products/watch", name: "List Products", id: 6 },
                { link: "products/add", name: "Shipping", id: 7 }
              ]}
            />
            <CollapseSidebar
              icon={FaStore}
              collapsed={collapsed}
              hovered={hovered}
              title="Stores"
              collapseddata={[
                ...(super_admin ? [{ link: "stores", name: "Stores Management ", id: 0 }] : []),
                { link: "stores/sales", name: "Stores Sales", id: 1 },
                { link: "stores", name: "Inventory", id: 2 },
              ]}
            />
            <CollapseSidebar
              icon={FaJediOrder}
              collapsed={collapsed}
              hovered={hovered}
              title="Orders"
              collapseddata={[
                { link: "orders/list", name: "List Order", id: 3 },
                ...(admin ? [{ link: "orders/create", name: "Create Order", id: 4 }] : []),
                { link: "orders", name: "Order Details", id: 5 },
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
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};
