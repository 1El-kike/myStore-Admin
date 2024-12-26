import React, { useEffect, useState } from "react";
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
import {  useParams } from "react-router-dom";
import { useEjecut } from "../../hooks/useEjecut";
import { TypeDefaultStore, TypeStore } from "../../interface/typestore";

export const EditStore_template = () => {
  const id = useParams()
  const { data }:{data:TypeStore} = useEjecut({ url: `stores/${id.id}` });
  const methods = useForm(Form_stores);
  const { onSubmit, error, success, isLoading } = useBack<FormData>({
    url: "stores/update",
    reset: methods.reset,
  });
 
  useEffect(() => {
    if (data) {
      methods.reset({
        id:data.id,
        name: data.name,
        address: data.address,
        code: data.code,
        description: data.description,
        email: data.email,
        imgfondo: data.imgfondo,
        imgPortada: data.imgPortada,
        imgStore: data.imgStore,
        isOpen: data.isOpen,
        phone: data.phone,
        phone2: data.phone2,
        promedioDescuento: data.promedioDescuento,
        promedioProduct: data.promedioProduct,
        selling_type: data.selling_type,
        timeEnd: data.timeEnd,
        timeInitial: data.timeInitial,
        tipo: data.tipo, 
        website_admin: data.website_admin,
      });
    }
    console.log(data)
  }, [data,methods])
  


  return (
    <>
  <div className="z-30 overflow-clip w-full">
      <Toolbar element="stores" action="Update Store" info={data} />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className=" lg:flex  md:mx-2 justify-center items-center "
        >
          <div className="grow basis-72 px-5 ">
            <Description name="stores" />
            <Detalles />
            <Category  index={data?.promedioProduct} select={categoryStore} label1="Store promedio price product" label2="Porsentaje de descuento promedio" data1="promedioProduct" data2="promedioDescuento"/>
          </div>
          <div className="grow mb-auto basis-72 px-5">
            <Images imagenDefault={data?.imgStore} data="imgStore" label="Imagen de Tienda" />
            <LogoAndApariencia imagenDefaultfondo={data?.imgfondo} imagenDefaultportada={data?.imgPortada} />
            <Inventoy label1="Tipo de Inventario" label2="Codigo de barras" data1="tipo" data2="code" />
            <Selling_Type indexdefault={data?.selling_type} />
           
            <div>
              <Submit
                error={error}
                isLoading={isLoading}
                reset={methods.reset}
                bottom1="Schedule"
                bottom2="Update Store"
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
