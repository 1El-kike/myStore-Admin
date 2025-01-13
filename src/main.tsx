import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { AuthProvider } from "./utils/AuthContext";
import { Routers } from "./router/router";

//setupAxios(axios)
//Chart.register(...registerables)

ReactDOM.createRoot(document.getElementById("root")!).render(
 <React.StrictMode>
     <AuthProvider>
       <Routers />
     </AuthProvider>
   </React.StrictMode>
);
