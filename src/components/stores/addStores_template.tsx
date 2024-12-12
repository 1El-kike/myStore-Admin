import React from "react";
import { Toolbar } from "../../elements/Toolbar";
import { FormProvider, useForm } from "react-hook-form";
import useBack from "../../hooks/useBack";
import { Description } from "../../elements/description";
import { Category } from "../../elements/category";
import { Selling_Type } from "../../elements/Selling_type";
import { Images } from "../../elements/addImage";
import { Shipping_Delivery } from "../../elements/Shipping_Delivery";
import { Pricing } from "../../elements/Pricing";
import { Submit } from "../../elements/Submit";
import { Inventoy } from "../../elements/Inventoy";
import { Form_stores } from "../../model/type_store";
import { Detalles } from "../../elements/detalles";
import { LogoAndApariencia } from "../../elements/LogoAndApariencia";
import { categoryStore } from "../../model/type_store";

export const AddStores_template = () => {
  const methods = useForm(Form_stores);
  const { onSubmit, error, success, isLoading } = useBack<FormData>({
    url: "stores/create",
    reset: methods.reset,
  });

  return (
    <div className="z-30 overflow-clip w-full">
      <Toolbar element="stores" action="Add New Store" />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className=" lg:flex  md:mx-2 justify-center items-center "
        >
          <div className="grow basis-72 px-5 ">
            <Description name="stores" />
            <Detalles />
            <Category  select={categoryStore} label1="Store promedio price product" label2="Porsentaje de descuento promedio" data1="promedioProduct" data2="promedioDescuento"/>
          </div>
          <div className="grow mb-auto basis-72 px-5">
            <Images data="imgStore" label="Imagen de Tienda" />
            <LogoAndApariencia />
            <Inventoy label1="Tipo de Inventario" label2="Codigo de barras" data1="tipo" data2="code" />
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
    </div>
  );
};
