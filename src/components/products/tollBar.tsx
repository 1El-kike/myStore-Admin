import React, { useState } from "react";
import { FaAnglesDown } from "react-icons/fa6";
export const TollButtom = () => {
  const time = () => {
    return "";
  };
  const [butto, setbutto] = useState([
    { name: "Time", function: time() },
    { name: "Level", function: time() },
    { name: "Lenguaje", function: time() },
    { name: "Type", function: time() },
  ]);

  return (
    <>
        <div className="flex flex-wrap  my-4 w-full gap-5 items-center justify-between">
            <label className="w-24 pl-3 font-bold">Group by</label>
          {butto?.map((data) => {
            return (
              <>
                <button className="shadow-xl flex-grow shadow-slate-300 text-gray-700 text-md rounded-xl  bg-gray-100 py-2 px-4 flex justify-center items-center gap-2">
                  {data.name} <FaAnglesDown />{" "}
                </button>
              </>
            );
          })}
        </div>
    </>
  );
};
