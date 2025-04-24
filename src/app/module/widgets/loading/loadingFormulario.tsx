import { Skeleton, Spinner } from "@nextui-org/react";
import React from "react";

export const LoadingFormulario = () => {
  return (
    <div className=" lg:flex  h-screen justify-center items-center ">
      <Spinner labelColor="danger" color="danger" label="Loading..." />
    </div>
  );
};
