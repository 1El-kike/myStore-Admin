import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { LayatSidebar } from "./sidebar/Sidebar";
import {} from "react-responsive";
import { Navbars } from "./navbar/navbar";
import { PageDataProvider } from "../core/pageTitle";
import { FiltertableandSearch } from "../core/filtertableandSearch";

export const Layout = () => {
  const [ancho, setancho] = useState(false);

  /*   useEffect(() => {
    console.log(ancho)
  }, [ancho])
   */

  return (
    <>

      <PageDataProvider>
    <FiltertableandSearch>
        <div className="flex w-full overflow-x-clip h-full">
          {/* fondo de color calido */}
          <div
            className="fixed inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
            >
            <div className="relative clip-fondo left-1/2 -z-10 aspect-[1155/778]  w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ee48dd] to-[#e7087b] opacity-10 sm:left-[calc(90%-40rem)] sm:w-[102.1875rem]"></div>
          </div>
          {/*   <Menu />  */}
          <div>
            <LayatSidebar setancho={setancho} />
          </div>
          <div className="w-full">
            <Navbars width={ancho} />
            <Outlet />
          </div>
        </div>
    </FiltertableandSearch>
      </PageDataProvider>
    </>
  );
};
