import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { categoryStore, Form_stores } from "../../../../model/type_store";
import useBack from "../../../hooks/useBack";
import { Toolbar } from "../../widgets/Toolbar";
import { Description } from "../../widgets/description";
import { Detalles } from "../../widgets/detalles";
import { Category } from "../../widgets/category";
import { Images } from "../../widgets/addImage";
import { LogoAndApariencia } from "../../widgets/LogoAndApariencia";
import { Inventoy } from "../../widgets/Inventoy";
import { Selling_Type } from "../../widgets/Selling_type";
import { Submit } from "../../widgets/Submit";
import { PageTitleInit } from "../../layout/tollbar/tiltleInit";

export const AddStores_template = () => {
  const methods = useForm(Form_stores);
  const { onSubmit, error, success, isLoading } = useBack<FormData>({
    url: "stores/create",
    reset: methods.reset,
  });

  return (
    <>
      <div className="z-30 overflow-clip w-full">
      <PageTitleInit/>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className=" lg:flex  md:mx-2 justify-center items-center "
          >
            <div className="grow basis-72 px-5 ">
              <Description name="stores" />
              <Detalles />
              <Category
                select={categoryStore}
                label1="Store promedio price product"
                label2="Porsentaje de descuento promedio"
                data1="promedioProduct"
                data2="promedioDescuento"
              />
            </div>
            <div className="grow mb-auto basis-72 px-5">
              <Images data="imgStore" label="Imagen de Tienda" />
              <LogoAndApariencia />
              <Inventoy
                label1="Tipo de Inventario"
                label2="Codigo de barras"
                data1="tipo"
                data2="code"
              />
              <Selling_Type />

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
        <Toolbar element="stores" action="Add New Store" />
      </div>
    </>
  );
};
