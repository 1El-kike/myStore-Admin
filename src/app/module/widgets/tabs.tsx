import { Tabs, Tab } from "@nextui-org/react";
import React from "react";
import { Option, TypeTabs } from "../../../interface/TypeTabs";

export const TabsNext: React.FC<TypeTabs> = ({ children }) => {
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        className="w-full"
        color="primary"
        variant="underlined"
      >
        {children.map((item: Option, index: number) => {
          return (
            <>
              <Tab
                key={item.option[index]}
                title={
                  <div className="flex items-center relative space-x-2">
                    {item.icon}
                    <span>{item.option}</span>
                  </div>
                }
              >
                {item.component}
                <span className="inset-0 h-[1px] mt-[35px] -z-10 bg-slate-300 absolute bottom-0"></span>
              </Tab>
            </>
          );
        })}
      </Tabs>
    </div>
  );
};
