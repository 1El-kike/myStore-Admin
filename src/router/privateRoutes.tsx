import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "../layout/layout";
import { Dashboard } from "../components/dashboard/dashboard";
import { Stores } from "../components/stores/main-stores";
import { AddStores_template } from "../components/stores/addStores_template";
import { SelectStoreforEdit } from "../components/stores/selectStoreforEdit";
import { WatchtoreforEdit } from "../components/stores/watchtoreforEdit";
import { SelectStoreforDelite } from "../components/stores/selectStoreforDelite";
import { Deletesuccess } from "../elements/deletesuccess";
import { EditStore_template } from "../components/stores/editStore_template";
import { Products } from "../components/products/main-products";
import { AddProducts } from "../components/products/addProducts";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="stores" element={<Stores />}></Route>
        <Route path="stores/add" element={<AddStores_template />}></Route>
        <Route path="stores/edit" element={<SelectStoreforEdit />}></Route>
        <Route path="stores/watch" element={<WatchtoreforEdit />}></Route>
        <Route path="stores/delite" element={<SelectStoreforDelite />}></Route>
        <Route path="stores/delete/:id" element={<Deletesuccess />}></Route>
        <Route path="stores/edit/:id" element={<EditStore_template />}></Route>
        <Route path="products" element={<Products />}></Route>
        <Route path="products/add/:idStore" element={<AddProducts />}></Route>
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};
