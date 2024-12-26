import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../components/home";
import { Dashboard } from "../components/dashboard/dashboard";
import { Layout } from "../layout/layout";
import { Products } from "../components/products/main-products";
import { AddProducts } from "../components/products/addProducts";
import { Auth } from "../components/auth/auth";
import { Stores } from "../components/stores/main-stores";
import { AddStores_template } from "../components/stores/addStores_template";
import { SelectStoreforEdit } from "../components/stores/selectStoreforEdit";
import { EditStore_template } from "../components/stores/editStore_template";

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
          path="/stores"
          element={<Layout children={<Stores />} />}
        ></Route>
          <Route
          path="/stores/add"
          element={<Layout children={<AddStores_template />} />}
        ></Route>
        <Route
          path="/stores/edit"
          element={<Layout children={<SelectStoreforEdit />} />}
        ></Route>
         <Route
          path="/stores/edit/:id"
          element={<Layout children={<EditStore_template />} />}
        ></Route>
        <Route
          path="/products"
          element={<Layout children={<Products />} />}
        ></Route>
           <Route
          path="/products/add/:idStore"
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
