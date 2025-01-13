import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { AuthProvider } from "./utils/AuthContext";
import { Routers } from "./router/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

//setupAxios(axios)
//Chart.register(...registerables)
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Routers />
    </AuthProvider>
   {/*  <ReactQueryDevtools initialIsOpen={true} /> */}
  </QueryClientProvider>
);
