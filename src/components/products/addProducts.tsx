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
import { FormProvider, useForm } from "react-hook-form";
import useBack from "../../hooks/useBack";
import { categoryProduct, Form_product } from "../../model/type_product";
import { useParams } from "react-router-dom";
import { port } from "../../config/env";
import { useAuth } from "../../utils/AuthContext";
import { useEjecut } from "../../hooks/useEjecut";
import { Size } from "../../elements/size";

// Definimos la interfaz para los datos del formulario

export const AddProducts: React.FC = () => {
  const { user } = useAuth();
  const methods = useForm(Form_product);
  const [category, setcategory] = useState(null)
  const { idStore } = useParams();
  const { onSubmit, error, success, isLoading, result } = useBack<FormData>({
    url: "allProducts/create",
    reset: methods.reset,
  });

  const addProductStore = async (idStore: number, idProducto: number) => {
    const data = {
      StoreId: idStore,
      productoId: idProducto,
    };

    try {
      const response = await fetch(`${port}productStore/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }
      console.log("se agregaron los productos a la tienda correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  const { data } = useEjecut({ url: `stores/${idStore}` });

  useEffect(() => {
    if (result) {
      console.log(Number(idStore), result?.id);
      addProductStore(Number(idStore), result?.id);
    }
  }, [result]);

  useEffect(() => {
    setcategory(methods.watch('category'))
    console.log(category);
  }, [methods.watch()])
  

  return (
    <>
      <div className="z-30 overflow-clip w-full">
        <Toolbar element={"products"} action={`Add New Product`} info={data} />
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className=" lg:flex  md:mx-2 justify-center items-center "
          >
            <div className="grow basis-72 px-5 ">
              <Description name="product" />
              <Category
                select={categoryProduct}
                label1="Product Category"
                label2=" Product Type"
                data1="category"
                data2="tipo"
              />
              <Inventoy
                label1="Quantity"
                label2="SKU(Option)"
                data1="quantity_total"
                data2="sku"
              />
              <Selling_Type />
            </div>
            <div className="grow mb-auto basis-72 px-5">
              <Images data="image" label="Product Images" />
              {category === "Food" && <div className="animate-opacity">
                <Shipping_Delivery />
              </div>
               }
               {category === "Clothes" && <div className="animate-opacity">
                <Size/>
                </div>}
              <Pricing />
              <div>
                <Submit
                  error={error}
                  isLoading={isLoading}
                  reset={methods.reset}
                  bottom1="Schedule"
                  bottom2="Add Product"
                  success={success}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
