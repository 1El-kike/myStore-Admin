import React from "react";

export const Category = ({ option_category, option_tipo }: any) => {
  return (
    <>
      <h1 className="text-2xl mt-5 font-bold">Category</h1>
      <form className="border my-5 px-3 py-2 flex flex-col border-gray-300 rounded-2xl">
        <label
          htmlFor="countries"
          className="block mt-5 mb-2 text-sm font-medium text-gray-900 "
        >
          Product Category
        </label>
        <select
          id="countries"
          className="bg-gray-50 border pl-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          {option_category.map((data: any) => {
            return (
              <>
                <option selected>{data}</option>
              </>
            );
          })}
        </select>
        <label
          htmlFor="countries"
          className="block mb-2  mt-5 text-sm font-medium text-gray-900 "
        >
          Product Category
        </label>
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          {option_tipo.map((data: any) => {
            return (
              <>
                <option selected>{data}</option>
              </>
            );
          })}
        </select>
      </form>
    </>
  );
};
