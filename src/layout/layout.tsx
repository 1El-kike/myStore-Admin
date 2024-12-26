import React from "react";
import { Menu } from "./menu";

export const Layout = ({ children }: any) => {
  return (
    <>
      <div className="flex w-full overflow-x-clip h-full">
        {/* fondo de color calido */}
        <div
          className="fixed inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div className="relative clip-fondo left-1/2 -z-10 aspect-[1155/778]  w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ee48dd] to-[#e7087b] opacity-10 sm:left-[calc(90%-40rem)] sm:w-[102.1875rem]"></div>
        </div> 
        <Menu />
        {children}
      </div>
    </>
  );
};
