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

export const sidebarLabelClass = (expanded: boolean) =>
  `inline-block overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${expanded ? "opacity-100 max-w-[200px] translate-x-0 delay-200" : "opacity-0 max-w-0 -translate-x-2"
  }`;

const sidebarRootClass = "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]";

export const LayatSidebar = ({ setancho }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 758px)" });

  useEffect(() => {
    setancho(collapsed);
    if (collapsed) setExpandedSection(null);
  }, []); collapsed

  setancho(collapsed);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleCollapseToggle = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  // No renderizar el sidebar si es móvil
  if (isMobile) {
    return null; // Oculta el sidebar en pantallas pequeñas
  }

  const ExpandedNull = () => {
    setExpandedSection(null)
  }

  const { currentUser } = useAuth();
  const { admin, super_admin, employee } = getRole(currentUser);

  return (
    <div
      className={`${collapsed ? "w-16" : "w-64"} z-40 ${sidebarRootClass} overflow-hidden`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Sidebar
        theme={custom}
        className={`${collapsed ? (hovered ? "w-64" : "w-16") : "w-64"} z-50 ${sidebarRootClass} fixed `}
        aria-label="Sidebar with logo branding example "
      >
        <div className="relative">
          <Link to={""}>
            <Sidebar.Logo
              href=""
              img={`${PUBLIC_URL}description/image(2).png`}
              imgAlt="Flowbite logo"
              onClick={() => ExpandedNull()}
              className={"text-white relative"}
            >
              <p className={sidebarLabelClass(!collapsed || hovered)}>{!collapsed ? "Stores" : hovered && "Stores"}</p>
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
            <Link
              onClick={() => ExpandedNull()}
              to={"dashboard"}>
              <Sidebar.Item href="" icon={MdSpaceDashboard}>
                <span className={sidebarLabelClass(!collapsed || hovered)}>Dashboard</span>
              </Sidebar.Item>
            </Link>
            <CollapseSidebar
              icon={HiShoppingBag}
              collapsed={collapsed}
              hovered={hovered}
              title="Products"
              isOpen={expandedSection === "products"}
              onToggle={() => handleCollapseToggle("products")}
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
              isOpen={expandedSection === "stores"}
              onToggle={() => handleCollapseToggle("stores")}
              collapseddata={[
                ...(super_admin ? [{ link: "stores", name: "Stores Management ", id: 0 }] : []),
                { link: "stores/watch", name: "Stores Sales", id: 1 },
                { link: "inventory", name: "Inventory", id: 2 },
              ]}
            />
            <CollapseSidebar
              icon={FaTasks}
              collapsed={collapsed}
              hovered={hovered}
              title="Orders"
              isOpen={expandedSection === "orders"}
              onToggle={() => handleCollapseToggle("orders")}
              collapseddata={[
                { link: "orders/list", name: "List Order", id: 3 },
                ...((admin || employee) ? [{ link: "orders/create", name: "Create Order", id: 4 }] : []),
                { link: "orders/list", name: "Order Details", id: 5 },
              ]}
            />
            {(super_admin || admin) && <Link
              onClick={() => ExpandedNull()}
              to={"users"}>
              <Sidebar.Item
                icon={UserIcon}
                href=""
                label={!collapsed ? "3" : hovered && "3"}
              >
                <span className={sidebarLabelClass(!collapsed || hovered)}>User management</span>
              </Sidebar.Item>
            </Link>}
            <Link
              onClick={() => ExpandedNull()}
              to={'#'}>
              <Sidebar.Item href="#" icon={FcSettings}>
                <span className={sidebarLabelClass(!collapsed || hovered)}>Setting</span>
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};
