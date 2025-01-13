import React, { Suspense } from "react";
import { Routers } from "./router/router";
import { AuthProvider } from "./utils/AuthContext";
import {NextUIProvider} from "@nextui-org/react";
import { Outlet } from "react-router-dom";

const LayoutSplashScreen = () => {
  return <div>Cargando...</div>;
};

export const App: React.FC = () => {
  return (
   /*  <Suspense fallback={<LayoutSplashScreen />}> */
       <NextUIProvider>
      {/*  <AuthInit> */}
              <Outlet />
            {/*   <MasterInit /> */}
           {/*  </AuthInit> */}
       </NextUIProvider>
    /* </Suspense> */
  );
};
