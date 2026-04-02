import { FC, memo, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

type Data = {
  link: string;
  name: string;
  id: number;
};
interface Collapse {
  collapsed: boolean;
  hovered: boolean;
  collapseddata: Array<Data>;
  title: string;
  icon: React.ElementType;
  isOpen: boolean;
  onToggle: () => void;
}

export const CollapseSidebar: FC<Collapse> = memo(
  ({ collapsed, hovered, collapseddata, title, icon: Icon, isOpen, onToggle }) => {
    const isMini = collapsed && !hovered;
    const [activeItemId, setActiveItemId] = useState<number | null>(null);

    return (
      <div className="mb-1 group">
        <button
          onClick={onToggle}
          className={`w-full focus:bg-blue-500/10 flex items-center justify-between rounded-lg p-3.5 transition-all duration-300 ease-in-out 
            ${isMini ? "justify-center" : "justify-between"} 
            ${isOpen ? "bg-rose-400/30 text-white" : "text-slate-300 hover:bg-rose-400/20"}`}
          aria-expanded={isOpen}
          title={title}
        >
          <div className="flex items-center gap-2">
            <Icon className="h-5 text-gray-500 group-hover:text-red-500 w-5" />
            {(
              <span className={`text-sm px-1 font-medium inline-block overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${!collapsed || hovered ? "opacity-100 max-w-[200px] translate-x-0 delay-200" : "opacity-0 max-w-0 -translate-x-2"
                }`}>

                <p className={`inline-block overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] ${!collapsed || hovered ? "opacity-100 max-w-[200px] translate-x-0 delay-200" : "opacity-0 max-w-0 -translate-x-2"
                  }`}>
                  {title}
                </p>
              </span>
            )}
          </div>
          {!isMini && (
            <span
              className={` transform transition-transform  flex duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
            >
              <FaAngleDown />
            </span>
          )}
        </button>

        <div
          className={`overflow-hidden transition-all duration-400 ease-in-out bg-slate-900/10 rounded-md mt-1 
          ${isOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}
        >
          <div className="flex border-l-2 select:bg-blue-500 border-rose-700 ml-2 flex-col gap-1 px-2 py-2">
            {collapseddata.map((item) => {
              const active = activeItemId === item.id;
              return (
                <Link key={item.id} to={item.link} onClick={() => setActiveItemId(item.id)}>
                  <div className={`rounded-md px-2 py-1 text-sm transition-colors duration-300 ${active ? "bg-blue-500/10 text-white" : "text-slate-200 hover:bg-rose-500/30 hover:text-white"} focus:bg-blue-500/10 focus:outline-none`}>
                    {(!collapsed || hovered) ? item.name : ""}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);
