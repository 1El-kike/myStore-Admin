import React from "react";
import { FormAuth } from "../FormAuth";

  export const Login = () => {

  return (
    <>
      <div className="bg-gradient-to-t  from-transparent via-indigo-300 to-violet-600 w-full h-full absolute"></div>
      <img
        src="/pngtree-stunning-3d-render-of-a-modern-supermarket-image_13561321.png"
        className="fixed  w-full h-[100%]  clip-triangle  shadow-red-600"
        alt=""
      />
      <div className=" overflow-hidden w-full relative h-screen">
        <FormAuth
          first_input="name"
          second_input="iphone"
          three_input="password"
          number_input="number"
          input5="Role"
        />
      </div>
    </>
  );
};
