import React from "react";
import { useAuth } from "../utils/AuthContext";
import { NotAuth } from "./auth/notAuth/notAuth";

export const Home = () => {

  const {user} =useAuth();

  if (!user) {
      return <NotAuth/>
  }

  return (
    <div className="w-full clip-test">
      
    </div>
  );
};
