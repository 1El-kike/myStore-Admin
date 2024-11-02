import React from "react";

export const Home = () => {
  return (
    <div className="w-full">
      <div className="relative w-full">
        <img
          src="/products2.png"
          alt="not found"
          className="w-96 h-52 animate-transitionleft absolute top-0 right-0"
        ></img>
      </div>
     
      <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
        <div className="w-full h-full rounded border-dashed border-2 border-gray-300"></div>
      </div>
    </div>
  );
};
