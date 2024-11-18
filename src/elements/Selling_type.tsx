import React from "react";

export const Selling_Type = () => {
  return (
    <>
      <h1 className="text-2xl mt-5 font-bold">Selling Type</h1>
      <form className="border pt-5 pl-11 my-5 px-3 py-2 flex flex-col gap-4  border-gray-300 rounded-2xl">
        <div className="flex items-center mb-4">
          <input
            id="checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4  bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
          />
          <label
            htmlFor="checkbox"
            className="ms-2 text-base font-black text-stone-900 "
          >
            In-store selling only
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input
            
            id="checkbox-1"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
          />
          <label
            htmlFor="checkbox-1"
            className="ms-2 text-base font-black text-stone-900 "
          >
           Online selling only
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input
            id="checkbox-2"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600  border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor="checkbox-2"
            className="ms-2 text-base font-black text-stone-900"
          >
            Avaliable both in-store and online
          </label>
        </div>
      </form>
    </>
  );
};
