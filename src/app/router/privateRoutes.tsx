import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "../module/layout/layout";
import { Dashboard } from "../pages/dashboard/dashboard";
import { Progress } from "@nextui-org/react";
interface WithChildren {
  children: React.ReactNode;
}

export const PrivateRoutes = () => {
  const StoresPage = lazy(() =>
    import("../pages/mannagerStores/storesRouter").then((module) => ({
      default: module.StoresRouter, // Asegúrate de que component sea la exportación nombrada
    }))
  );
  const ProductsPage = lazy(() =>
    import("../pages/mananagerProduct/productsPage").then((module) => ({
      default: module.ProductsPage,
    }))
  );
  const OrderPage = lazy(() =>
    import("../pages/orders/orderPage").then((module) => ({
      default: module.OrderPage,
    }))
  );

  const SuspensedView: FC<WithChildren> = ({ children }) => {
    return (
      <Suspense
        fallback={
          <div
            style={{
              width: "100%",
              height: "100vh",
              padding: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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

        <Route
          path="stores/*"
          element={
            <SuspensedView>
              <StoresPage />
            </SuspensedView>
          }
        ></Route>
        <Route
          path="products/*"
          element={
            <SuspensedView>
              <ProductsPage />
            </SuspensedView>
          }
        ></Route>
        <Route
          path="orders/*"
          element={
            <SuspensedView>
              <OrderPage />
            </SuspensedView>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};
