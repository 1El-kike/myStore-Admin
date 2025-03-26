import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { SelectAddProducts } from "../../module/components/products/add/productMannager";
import { AddProducts } from "../../module/components/products/addProducts";
import { ProductMain } from "./prouctMain";
import { PageTitle } from "../../module/core/pageTitle";
import { SelectEditProducts } from "../../module/components/products/edit/selecteditProduct";
import { EditProducts } from "../../module/components/products/edit/editProducts";

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
  const selectStoreEditProduct: Array<PageLink> = [
    {
      title: "Beginning",
      path: "/products/management",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Select store for edit products",
      path: "/products/edit",
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
  const editProduct: Array<PageLink> = [
    {
      title: "Beginning",
      path: "/products/management",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Select store for edit products",
      path: "/products/edit",
      isSeparator: true,
      isActive: false,
    },
    {
      title: "Edit Products",
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
            <SelectAddProducts />
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
      <Route
        path="edit"
        element={
          <>
            <PageTitle breadcrumbs={selectStoreEditProduct}>
              Select Shop
            </PageTitle>
            <SelectEditProducts />
          </>
        }
      />
       <Route
        path="edit/:idProduct"
        element={
          <>
            <PageTitle breadcrumbs={editProduct}>Create Product</PageTitle>
            <EditProducts />
          </>
        }
      />
    
      <Route index element={<Navigate to="management" />} />
    </Routes>
  );
};
