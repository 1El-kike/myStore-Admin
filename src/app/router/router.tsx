import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PUBLIC_URL } from "../../config/env";
import { ErrorsPage } from "../module/errors/errorsPage";
import { PrivateRoutes } from "./privateRoutes";
import { App } from "../../App";
import { useAuth } from "../utils/AuthContext";
import { Logout } from "../module/auth/logout";
import { Auth } from "../module/auth/auth";

export const Routers = () => {
  const { user} = useAuth();

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="auth/logout" element={<Logout />} />
          {true ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="dashboard" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<Auth />} />
             {/*  <Route path="*" element={<Navigate to="auth/register" />} /> */}
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
