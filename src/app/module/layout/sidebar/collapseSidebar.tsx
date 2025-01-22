import { Sidebar } from "flowbite-react";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Data = {
    link:string;
    name:string;
  }
  interface Collapse {
    collapsed: boolean;
    hovered: boolean;
    collapseddata: Array<Data>;
    title:string;
    icon:any
  }

  export const CollapseSidebar: FC<Collapse> = ({
    collapsed,
    hovered,
    collapseddata,
    title,
    icon
  }) => {
    const [data, setdata] = useState<Data | unknown>([]);

    useEffect(() => {
      
    setdata(collapseddata)
    }, [])
    

    return (
      <>
        {collapsed && !hovered ? (
          icon
         // < size={20} className=" text-gray-300/70  ml-3" />
        ) : (
          <Sidebar.Collapse
            icon={icon}
            label={!collapsed ? title : hovered ? title : ""}
            className="hover:bg-transparent text-slate-300 [&>svg]:hover:text-red-500"
          >
            {Array.isArray(data)  && data?.map((collapse :Data) => {
              return (
                <>
                  <Link key={collapse.name} to={collapse?.link}>
                    <Sidebar.Item href="#">
                      {!collapsed
                        ? collapse?.name
                        : hovered && collapse?.name}
                    </Sidebar.Item>
                  </Link>
                </>
              );
            })}
          </Sidebar.Collapse>
        )}
      </>
    );
  };