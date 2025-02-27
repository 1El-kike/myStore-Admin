import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Routers } from "./app/router/router";
import { AuthProvider } from "./app/module/auth/core/Auth";
import { setupAxios } from "./app/module/auth/core/AuthHelpers";
import axios from 'axios'


setupAxios(axios)
//Chart.register(...registerables)
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Routers />
    </AuthProvider>
    <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>
);
