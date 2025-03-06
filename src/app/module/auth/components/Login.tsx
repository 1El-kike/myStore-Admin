import React from "react";
import { FormAuthLogin } from "../formAuthLogin";

  export const Login = () => {

  return (
    <>
      <div className="w-full relative h-screen">
        <FormAuthLogin
          input_iphone="iphone"
          password_input="password"
        />
      </div>
    </>
  );
};
