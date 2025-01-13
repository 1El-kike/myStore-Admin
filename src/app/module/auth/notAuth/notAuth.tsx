import { Alert } from "flowbite-react";
import React from "react";
import { HiInformationCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";

export const NotAuth = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <div className="absolute top-0 left-0 w-full h-screen -z-10 bg-gradient-to-tr from-transparent to-violet-500" ></div>
        <Alert withBorderAccent color="red" icon={HiInformationCircle} className="mt-6">
          <span className="font-bold">No estas registrado</span>
          <br />
          <span className="text-base">
            Por favor,{" "}
            <Link
              to="/auth/login"
              className="font-medium text-red-600 hover:underline"
            >
              iniciar sesion
            </Link>
            {" "} o{" "}
            <Link
              to={"/auth/register"}
              className="font-medium text-blue-600 hover:underline"
            >
              registrate
            </Link>
          </span>
        </Alert>
      </div>
    </div>
  );
};
