import React from "react";
import { Breadcrumb } from "../../module/widgets/breadcrumbs";
import { PageTitleInit } from "../../module/layout/tollbar/tiltleInit";

export const ProductMain = () => {
  const AddProducts = () => {
    return (
      <>
        <div className="lg:w-[45%] md:w-full  grow">
          <div className=" border border-gray-300 rounded-xl flex h-full">
            s
          </div>
        </div>
      </>
    );
  };

 
  return (
    <>
    <PageTitleInit/>
      <div className="flex md:flex-col lg:flex-row flex-wrap w-full justify-center items-center">
        <div className="grow h-[570px] w-full lg:w-[50%] gap-5 p-10 flex flex-wrap">
          <AddProducts />
          <AddProducts />
          <AddProducts />
          <AddProducts />
        </div>
        <div className="grow w-full lg:w-[50%] basis-[600px] h-[570px] p-10 flex">
          <AddProducts />
        </div>
      </div>
    </>
  );
};
