import { ArrowLeftIcon } from "@mui/x-date-pickers";
import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaStore, FaTasks } from "react-icons/fa";
import {
  HiShoppingBag,
} from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { CollapseSidebar } from "./collapseSidebar";
import { PUBLIC_URL } from "../../../../config/env";
import { useAuth } from "../../auth/core/Auth";
import { UserIcon } from "../../widgets/iconSVG";
import { getRole } from "../../../utils/getRoles";
import { FcSettings } from "react-icons/fc";


const custom = {
  root: {
    base: "h-full",
    inner:
      "bg-gradient-to-br py-5 px-2 h-screen from-slate-900 text-slate-800 to-rose-950 ",
  },
  item: {
    base: "flex focus:bg-blue-500/10 [&>svg]:hover:text-red-500 hover:bg-rose-400/30  rounded-lg p-3 text-base font-normal text-slate-300 transition-all duration-400 delay-400",
  },
  itemGroup: {
    base: "mt-4  space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 transition-all duration-400 delay-400",
  },
  logo: {
    base: "mb-5  flex items-center m-auto",
  },
  collapse: {
    button:
      "icon-error hover:bg-rose-400/30 focus:bg-blue-500/10 flex w-full items-center rounded-lg mb-2  transition-all duration-400 delay-400 p-3 text-base font-normal",

    icon: {
      base: "h-5  ml-1  w-6 text-gray-500 transition duration-75",
      open: {
        off: "",
        on: "",
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
  const { admin, super_admin, employee } = getRole(currentUser);

  return (
    <div
      className={` ${collapsed ? " w-16 " : "w-64 "
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
                ...((admin || super_admin) ? [{ link: "products", name: "Product Management", id: 8 }] : []),
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
                { link: "stores/watch", name: "Stores Sales", id: 1 },
                { link: "stores", name: "Inventory", id: 2 },
              ]}
            />
            <CollapseSidebar
              icon={FaTasks}
              collapsed={collapsed}
              hovered={hovered}
              title="Orders"
              collapseddata={[
                { link: "orders/list", name: "List Order", id: 3 },
                ...((admin || employee) ? [{ link: "orders/create", name: "Create Order", id: 4 }] : []),
                { link: "orders/list", name: "Order Details", id: 5 },
              ]}
            />
            {(super_admin || admin) && <Link to={"users"}>
              <Sidebar.Item
                icon={UserIcon}
                href=""

                label={!collapsed ? "3" : hovered && "3"}
              >
                {!collapsed ? "User management" : hovered && "User management"}
              </Sidebar.Item>
            </Link>}
            <Sidebar.Item href="#" icon={FcSettings}>
              {!collapsed ? "Setting" : hovered && "Setting"}
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};
