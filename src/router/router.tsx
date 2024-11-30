import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../components/home";
import { Dashboard } from "../components/dashboard";
import { Layout } from "../layout/layout";
import { Products } from "../components/products/main-products";
import { AddProducts } from "../components/products/addProducts";
import { Auth } from "../components/auth/auth";

export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout children={<Home />} />}></Route>
        <Route
          path="/dashboard"
          element={<Layout children={<Dashboard />} />}
        ></Route>
        <Route
          path="/products"
          element={<Layout children={<Products />} />}
        ></Route>
           <Route
          path="/products/add"
          element={<Layout children={<AddProducts />} />}
        ></Route>
         <Route
          path="/auth/register"
          element={<Auth />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};
