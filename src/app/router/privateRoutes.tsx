import { lazy, FC, Suspense, PropsWithChildren } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "../module/layout/layout";
import { Dashboard } from "../pages/dashboard/dashboard";
import { Products } from "../module/components/products/productMannager";
import { AddProducts } from "../module/components/products/addProducts";
import { Progress } from '@nextui-org/react';
import { ProductsPage } from "../pages/mananagerProduct/productsPage";
import { OrderPage } from "../pages/orders/orderPage";
  interface WithChildren {
    children: React.ReactNode;
  }

export const PrivateRoutes = () => {

  

  const StoresPage = lazy(()=> 
    import('../pages/mannagerStores/storesRouter').then((module) => ({
      default: module.StoresRouter, // Asegúrate de que component sea la exportación nombrada
    }))
  )
  
  const SuspensedView: FC<WithChildren> = ({ children }) => {
    return (
      <Suspense
        fallback={
          <div style={{ width: '100%', padding: '20px' }}>
            <Progress
              isIndeterminate // Propiedad para mostrar una barra de progreso indefinida
              color="primary" // Define el color de la barra (usa colores predefinidos de NextUI)
              size="lg" // Tamaño de la barra (pequeño, mediano o grande)
            />
          </div>
        }
      >
        {children}
      </Suspense>
    );
  };

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<Dashboard />}></Route>

        <Route path="stores/*" element={
          <SuspensedView>
            <StoresPage />
          </SuspensedView>
          }></Route>
           <Route path="products/*" element={
          <SuspensedView>
            <ProductsPage />
          </SuspensedView>
          }></Route>
          <Route path="orders/*" element={
            <SuspensedView>
              <OrderPage />
            </SuspensedView>
            }></Route>
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};


