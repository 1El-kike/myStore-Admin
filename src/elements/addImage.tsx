import React from "react";
import { HiArrowUpCircle } from "react-icons/hi2";
export const Images = () => {
  return (
    <>
      <h1 className="text-2xl mt-5 font-bold flex items-center gap-2">
        Product Images <HiArrowUpCircle />
      </h1>
      <form className="border my-5 px-3 py-2 md:flex gap-4  border-gray-300 rounded-2xl">
        <div className="grow">
          <label
            htmlFor="dropzone-file"
            className="flex  flex-col items-center justify-center w-full h-34 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 ">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 ">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
        <div className="grow">
          <img src="/products.png"></img>
        </div>
        <div className="grow">

</div>
      </form>
    </>
  );
};
