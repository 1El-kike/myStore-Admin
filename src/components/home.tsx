import React from "react";
import { useAuth } from "../utils/AuthContext";
import { NotAuth } from "./auth/notAuth/notAuth";

export const Home = () => {

  const {user} =useAuth();

  if (!user) {
      return <NotAuth/>
  }

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
