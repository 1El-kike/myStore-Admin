import React, { useEffect, useState } from "react";
import { Toolbar } from "../../elements/Toolbar";
import { Description } from "../../elements/description";
import { Category } from "../../elements/category";
import { Inventoy } from "../../elements/Inventoy";
import { Selling_Type } from "../../elements/Selling_type";
import { Images } from "../../elements/addImage";
import { Shipping_Delivery } from "../../elements/Shipping_Delivery";
import { Pricing } from "../../elements/Pricing";
import { Submit } from "../../elements/Submit";
import { FormData } from "../../interface/FormData";

// Definimos la interfaz para los datos del formulario


export const AddProducts: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    category: "",
    tipo: "",
    quantity: 0,
    sku:"",
    image: "",
    price: 0,
    inventoryStatus: "",
    cantidad: 1,
    selling_type:undefined,
    items_weight:""
  });

  // Función para recibir datos del hijo
  const handleFormDataChange = (data: Partial<FormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  // useEffect para observar cambios en formData
  useEffect(() => {
    console.log("Datos recibidos del hijo:", formData);
  }, [formData]); // Solo se ejecuta cuando formData cambia

  return (
    <>
      <div className="z-30 overflow-clip w-full">
        <Toolbar />
        <div className=" md:flex  md:mx-2 justify-center items-center ">
          <div className="grow basis-72 px-5 ">
            <Description onFormDataChange={handleFormDataChange} />
            <Category onFormDataChange={handleFormDataChange} />
            <Inventoy onFormDataChange={handleFormDataChange} />
            <Selling_Type onFormDataChange={handleFormDataChange} />
          </div>
          <div className="grow mb-auto basis-72 px-5">
            <Images />
            <Shipping_Delivery  onFormDataChange={handleFormDataChange} />
            <Pricing  onFormDataChange={handleFormDataChange} />
            <div>
              <Submit />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
