import React from "react";
import { Outlet } from "react-router-dom";
import { PUBLIC_URL } from "../../../config/env";
import fondo from "/pngtree-stunning-3d-render-of-a-modern-supermarket-image_13561321.png";
import { Image } from "@nextui-org/react";

export const AuthLayout = () => {
  return (
    <div className="d-flex flex-column flex-column-fluid flex-lg-row bg-gradient-to-l h-100 from-blue-700 to-purple-500">
      <div className="h-[100%] shadow-red-600 w-full fixed">
        <Image
          isBlurred
          className=""
          width={"100%"}
          alt="Album Cover"
          src={`${PUBLIC_URL}pngtree-stunning-3d-render-of-a-modern-supermarket-image_13561321.png`}
        />
      </div>
      {/* <img
        loading="lazy" // Carga bajo demanda (ideal para imágenes fuera del viewport inicial)
        srcSet={`${fondo} 300w, ${fondo} 600w, ${fondo} 1200w`}
      />
 */}{" "}
      <Outlet />
    </div>
  );
};
