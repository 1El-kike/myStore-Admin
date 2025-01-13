import React, { Suspense } from "react";
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
          {/* <MasterInit /> */}
         {/*  </AuthInit> */}
       </NextUIProvider>
    /* </Suspense> */
  );
};
