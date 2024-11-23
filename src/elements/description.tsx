import React, { useEffect } from "react";
import { useFormContext } from 'react-hook-form';

export const Description: React.FC = () => {

  const { register, formState: { errors } } = useFormContext();

  return (
    <>
    <h1 className="text-2xl mt-5 font-bold">Description</h1>
    <form className="shadow-xl shadow-slate-200 border my-5 px-3 py-2 flex flex-col border-gray-300 rounded-2xl">
      <div className="flex relative flex-col">
        <label
          htmlFor="name"
          className="block mb-2 text-base font-medium text-gray-900"
        >
          Product Name
        </label>
        <input
          type="text"
          {...register("name", { required: "This field is required" })}
          id="name"
          aria-describedby="helper-text-explanation"
          className={ `bg-gray-50 mb-2 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${errors?.name ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 ": "text-gray-900"}`}
          placeholder="Product"
        />
      {errors.name && <span className="text-red-500 absolute -bottom-5">{ errors.name.message }</span>} 
      </div>
      <div>
        <div className="my-5">
          <label
            htmlFor="helper-text"
            className="block mb-2 text-base font-medium text-gray-900"
          >
            Business Description
          </label>
          <div className={`w-full mb-7 border  ${errors?.description ? "border-red-500 rounded-lg bg-red-50":"border-gray-200 rounded-lg bg-gray-50"}`}>
            <div className="flex items-center justify-between px-3 py-2 border-b ">
              <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse ">
                <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 "
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                      <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z" />
                    </svg>
                    <span className="sr-only">Format code</span>
                  </button>
               
                </div>
                <div className="flex flex-wrap  items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                  <button
                    type="button"
                    className="p-2 text-blue-400 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 "
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                      <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Download</span>
                  </button>
                    <p className=" text-blue-400">Upload .txt file</p>
                </div>
              </div>
              <button
                type="button"
                data-tooltip-target="tooltip-fullscreen"
                className="p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 "
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 19 19"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"
                  />
                </svg>
                <span className="sr-only">Full screen</span>
              </button>
              <div
                id="tooltip-fullscreen"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip "
              >
                Show full screen
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
            <div className="px-4 relative py-2 bg-white rounded-b-lg ">
              <label htmlFor="description" className="sr-only">
                Publish post
              </label>
              <textarea
                id="description"
                {...register("description", { required: "This field is required" })}
                className={`block px-1 w-full text-sm text-gray-900 border-0 focus:ring-0 `}
                placeholder="Write an article..."
                required
              ></textarea>
               { errors?.description  &&  <p className="text-red-500 absolute left-0 -bottom-7">This field is required</p>}
            </div>
          </div>
        </div>
      </div>
    </form>
    </>

  );
};
