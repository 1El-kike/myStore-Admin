import React, { Suspense } from "react";
import {NextUIProvider} from "@nextui-org/react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./app/utils/ScrollToTop";
import { AuthInit } from "./app/module/auth/core/Auth";

const LayoutSplashScreen = () => {
  return <div>Cargando...</div>;
};

export const App: React.FC = () => {
  return (
   /*  <Suspense fallback={<LayoutSplashScreen />}> */
       <NextUIProvider>
        {/* component para que cada navegacion de pagina empieze desde el inicio */}
        <ScrollToTop/>
          <AuthInit>
              <Outlet />
          {/* <MasterInit /> */}
          </AuthInit>
       </NextUIProvider>
    /* </Suspense> */
  );
};
