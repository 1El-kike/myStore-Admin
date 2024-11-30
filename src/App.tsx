import React from "react";
import { Routers } from "./router/router";
import { AuthProvider } from "./utils/AuthContext";

export const App: React.FC = () => {
  return (
    <div className="">
      <AuthProvider>
        <Routers />
      </AuthProvider>
    </div>
  );
};
