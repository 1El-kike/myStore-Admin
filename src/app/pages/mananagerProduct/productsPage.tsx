import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { SelectAddProducts } from "../../module/components/products/add/productMannager";
import { AddProducts } from "../../module/components/products/add/addProducts";
import { ProductMain } from "./prouctMain";
import { PageTitle } from "../../module/core/pageTitle";
import { SelectEditProducts } from "../../module/components/products/edit/selecteditProduct";
import { EditProducts } from "../../module/components/products/edit/editProducts";
import { SelectStoreEditProduct } from "../../module/components/products/edit/selectStoreEditProduct";
import { DelitedProducts } from "../../module/components/products/delited/delitedProducts";
import { DeliteSelectProducts } from "../../module/components/products/delited/deliteSelectProducts";
import { Delite } from "../../module/components/products/delited/delite";
import { WatchProducts } from "../../module/components/products/watch/watchProducts";
import { WatchSelectProducts } from "../../module/components/products/watch/watchSelectProducts";
import { Watch } from "../../module/components/products/watch/watch";
import { useAuth } from "../../module/auth/core/Auth";
import { getRole } from "../../utils/getRoles";

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
  const selectStoreEditProduct: Array<PageLink> = [
    {
      title: "Beginning",
      path: "/products/management",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Select store for edit products",
      path: "",
      isSeparator: true,
      isActive: false,
    },
  ];

  const editProductofStore: Array<PageLink> = [
    {
      title: "Beginning",
      path: "/products/management",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Select store for edit products",
      path: "/products/select",
      isSeparator: true,
      isActive: false,
    },
    {
      title: "Select Products",
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
      path: "/products/select",
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

  const watchProduct = [
    {
      title: "Beginning",
      path: "/products/management",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Select store for watch products",
      path: "",
      isSeparator: true,
      isActive: false,
    },
  ];

  const watchSelectProduct = [
    {
      title: "Beginning",
      path: "/products/management",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Select store for watch products",
      path: "/products/watch",
      isSeparator: true,
      isActive: false,
    },
    {
      title: "Watch products",
      path: "/",
      isSeparator: true,
      isActive: false,
    },
  ];

  const watch = [
    {
      title: "Beginning",
      path: "/products/management",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Select store for watch products",
      path: "/products/watch",
      isSeparator: true,
      isActive: false,
    },
    {
      title: "Select products",
      path: "",
      isSeparator: true,
      isActive: false,
    },
  ];

  const deleteProduct = [
    {
      title: "Beginning",
      path: "/products/management",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Select store for delete products",
      path: "",
      isSeparator: true,
      isActive: false,
    },
  ];

  const deleteSelectProduct = [
    {
      title: "Beginning",
      path: "/products/management",
      isSeparator: false,
      isActive: false,
    },
    {
      title: "Select store for delete products",
      path: "/products/delite",
      isSeparator: true,
      isActive: false,
    },
    {
      title: "Delete products",
      path: "/",
      isSeparator: true,
      isActive: false,
    },
  ];


  const { currentUser } = useAuth();
  const { admin, super_admin } = getRole(currentUser);


  return (
    <Routes>
      {/*###################  Ruta del campo mirar  #######################*/}
      <Route
        path="watch"
        element={
          <>
            <PageTitle breadcrumbs={watchProduct}>Watch Product</PageTitle>
            <WatchProducts />
          </>
        }
      />
      <Route
        path="watch/select"
        element={
          <>
            <PageTitle breadcrumbs={watchSelectProduct}>Watch Product</PageTitle>
            <WatchSelectProducts />
          </>
        }
      />
      <Route
        path="watch/select/:idProduct"
        element={
          <>
            <PageTitle breadcrumbs={watch}>Watch Product</PageTitle>
            <Watch />

          </>
        }
      />

      {
        (admin || super_admin) ?
          <>
            {/*############### Ruta de campo Delite ######################### */}
            <Route
              path="delite"
              element={
                <>
                  <PageTitle breadcrumbs={deleteProduct}>Delete Product</PageTitle>
                  <DelitedProducts />
                </>
              }
            />
            <Route
              path="delite/select"
              element={
                <>
                  <PageTitle breadcrumbs={deleteSelectProduct}>Select Shop</PageTitle>
                  <DeliteSelectProducts />
                </>
              }
            />
            <Route
              path="delite/select/:idProduct"
              element={
                <>
                  <PageTitle breadcrumbs={deleteSelectProduct}>Delete Product</PageTitle>
                  <Delite />

                </>
              }
            />
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
              path="select"
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
              path="select/edit"
              element={
                <>
                  <PageTitle breadcrumbs={editProductofStore}>
                    Select Product
                  </PageTitle>
                  <SelectStoreEditProduct />
                </>
              }
            />

            <Route
              path="select/edit/:idProduct"
              element={
                <>
                  <PageTitle breadcrumbs={editProduct}>Create Product</PageTitle>
                  <EditProducts />
                </>
              }
            />
          </>
          :
          <Route path="/*" element={<Navigate to="watch" />} />
      }


      <Route index element={<Navigate to="management" />} />
    </Routes>
  );
};
