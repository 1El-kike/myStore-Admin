import React from "react";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../config/env";
import { ErrorsPage } from "../module/errors/errorsPage";
import { PrivateRoutes } from "./privateRoutes";
import { App } from "../../App";
import { Logout } from "../module/auth/logout";
import { AuthPage } from "../module/auth/authPage";
import { useAuth } from "../module/auth/core/Auth";

export const Routers = () => {
  const { currentUser } = useAuth();
  console.log(currentUser)
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="auth/logout" element={<Logout />} />
          {currentUser ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="dashboard" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
