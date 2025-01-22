import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Products } from "../../module/components/products/productMannager";
import { AddProducts } from "../../module/components/products/addProducts";
import { ProductMain } from "./prouctMain";
import { PageTitle } from "../../module/core/pageTitle";

interface PageLink {
  title: string;
  path: string;
  isSeparator: boolean;
  isActive: boolean;
}

export const ProductsPage = () => {
  const managament: Array<PageLink> = [
    {
      title: "Beginning",
      path: "",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "",
      path: "",
      isSeparator: true,
      isActive: false,
    },
  ];
  const selectStoreAddProduct: Array<PageLink> = [
    {
      title: "Beginning",
      path: "/products/management",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Select store for add products",
      path: "/products/add",
      isSeparator: true,
      isActive: false,
    },
  ];
  const addProduct: Array<PageLink> = [
    {
      title: "Beginning",
      path: "/products/management",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Select store for add products",
      path: "/products/add",
      isSeparator: true,
      isActive: false,
    },
    {
      title: "Add Products",
      path: "",
      isSeparator: true,
      isActive: false,
    },
  ];

  return (
    <Routes>
      <Route
        path="management"
        element={
          <>
            <PageTitle breadcrumbs={managament}>Product Management</PageTitle>
            <ProductMain />
          </>
        }
      />
      <Route
        path="add"
        element={
          <>
            <PageTitle breadcrumbs={selectStoreAddProduct}>
              Select Shop
            </PageTitle>
            <Products />
          </>
        }
      />
      <Route
        path="add/:idStore"
        element={
          <>
            <PageTitle breadcrumbs={addProduct}>Create Product</PageTitle>
            <AddProducts />
          </>
        }
      />
      <Route index element={<Navigate to="management" />} />
    </Routes>
  );
};
