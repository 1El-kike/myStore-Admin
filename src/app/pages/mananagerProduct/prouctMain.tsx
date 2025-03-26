import React from "react";
import { Breadcrumb } from "../../module/widgets/breadcrumbs";
import { PageTitleInit } from "../../module/layout/tollbar/tiltleInit";
import { Link } from "react-router-dom";

export const ProductMain = () => {
  const AddProducts = () => {
    return (
      <>
        <div className="lg:w-[45%] md:w-full  grow">
        <Link to={"/products/add"}> 
          <div className=" border overflow-hidden border-gray-300 rounded-xl h-44 flex ">
            <img src="/1.png" className="w-full scale-125" alt="" />
          </div>
        </Link>
        </div>
      </>
    );
  };
  const DeliteProducts = () => {
    return (
      <>
        <div className=" grow">
        <Link to={"/products/delite"}> 
          <div className=" border overflow-hidden border-gray-300  rounded-xl flex h-72">
            <img src="/image.png" className="w-full scale-125" alt="" />
          </div>
        </Link>
        </div>
      </>
    );
  };
  const EditProducts = () => {
    return (
      <>
        <div className="lg:w-[45%] md:w-full   grow">
        <Link to={"/products/edit"}> 
          <div className=" border overflow-hidden border-gray-300 rounded-xl h-44 flex ">
            <img src="/products.png" className="w-full scale-125" alt="" />
          </div>
        </Link>
        </div>
      </>
    );
  };

  const ListProducts = () => {
    return (
      <>
        <div className=" h-[490px] md:w-full grow">
          

          <div className=" border overflow-hidden  border-gray-300 rounded-xl flex h-full">
        <Link to={"/products/watch"}> 
            <img src="/home/home.jpg" className="w-full scale-125 h-full "  alt="" />
        </Link>
          </div>
        </div>
      </>
    );
  };

 
  return (
    <>
    <PageTitleInit/>
      <div className="flex md:flex-col lg:flex-row flex-wrap w-full justify-center items-center">
        <div className="grow   w-full lg:w-[50%] gap-5 p-10 flex flex-col md:flex-row flex-wrap">
          <AddProducts />
          <EditProducts />
          <DeliteProducts />
        </div>
        <div className="grow w-full lg:w-[50%] gap-5 p-10 flex flex-col md:flex-row flex-wrap ">
          <ListProducts />
        </div>
      </div>
    </>
  );
};
