import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { categoryProduct, Form_product } from "../../../../../model/type_product";
import useBack from "../../../../hooks/useBack";
import { port } from "../../../../../config/env";
import { useEjecut } from "../../../../hooks/useEjecut";
import { Toolbar } from "../../../widgets/Toolbar";
import { Description } from "../../../widgets/description";
import { Category } from "../../../widgets/category";
import { Inventoy } from "../../../widgets/Inventoy";
import { Selling_Type } from "../../../widgets/Selling_type";
import { Images } from "../../../widgets/addImage";
import { Shipping_Delivery } from "../../../widgets/Shipping_Delivery";
import { Size } from "../../../widgets/size";
import { Pricing } from "../../../widgets/Pricing";
import { Submit } from "../../../widgets/Submit";
import { PageTitleInit } from "../../../layout/tollbar/tiltleInit";
import { useAuth } from "../../../auth/core/Auth";
import { LoadingAddProduct } from "../../../widgets/loading/loadingAddProduct";

// Definimos la interfaz para los datos del formulario

export const AddProducts: React.FC = () => {
  const { auth } = useAuth();
  const methods = useForm(Form_product);
  const [category, setcategory] = useState(null);
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
          Authorization: `Bearer ${auth?.api_token}`,
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

  const { data,errors,isLoadingData } = useEjecut({ url: `stores/${idStore}` });

  useEffect(() => {
    if (result) {
      addProductStore(Number(idStore), result?.id);
    }
  }, [result]);

  useEffect(() => {
    setcategory(methods.watch("category"));
  }, [methods.watch()]);

  return (
    <>
      <div className="z-30 overflow-clip w-full">
        {error ? <>
          <Toolbar element={"products"} action={`Add New Product`}  />
            <p>Error...</p>
        </>
          : isLoadingData ? 
          <>
          <Toolbar element={"products"} action={`Add New Product`}  />
            <LoadingAddProduct/>
        </>
          :
           <Toolbar element={"products"} action={`Add New Product`} info={data}  />
      }
        <PageTitleInit />
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
              {category === "Para Hogar" && (
                <div className="animate-opacity">
                  <Shipping_Delivery />
                </div>
              )}
              {category === "Clothes" && (
                <div className="animate-opacity">
                  <Size />
                </div>
                
              )}
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
