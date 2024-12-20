import React from "react";
import { Routers } from "./router/router";
import { AuthProvider } from "./utils/AuthContext";
import {NextUIProvider} from "@nextui-org/react";

export const App: React.FC = () => {
  return (
    <div className="">
       <NextUIProvider>
      <AuthProvider>
        <Routers />
      </AuthProvider>
       </NextUIProvider>
    </div>
  );
};
