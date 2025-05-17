import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { categoryStore, Form_stores } from "../../../../../model/type_store";
import { DataUseEjecut, useEjecut } from "../../../../hooks/useEjecut";
import useBack from "../../../../hooks/useBack";
import { Toolbar } from "../../../widgets/Toolbar";
import { Description } from "../../../widgets/description";
import { Detalles } from "../../../widgets/detalles";
import { Category } from "../../../widgets/category";
import { Images } from "../../../widgets/addImage";
import { LogoAndApariencia } from "../../../widgets/LogoAndApariencia";
import { Inventoy } from "../../../widgets/Inventoy";
import { Selling_Type } from "../../../widgets/Selling_type";
import { Submit } from "../../../widgets/Submit";
import { PageTitleInit } from "../../../layout/tollbar/tiltleInit";
import { ErrorsItems } from "../../../errors/errorsItems";
import { LoadingFormulario } from "../../../widgets/loading/loadingFormulario";

export const EditStore_template = () => {
  const id = useParams();
  const methods = useForm(Form_stores);
  const { data,isLoadingData,errors }: DataUseEjecut = useEjecut({
    url: `stores/${id.id}`,
    submit: methods.formState.isSubmitting,
  });

  useEffect(() => {
    if (data) {
      methods.reset({
        id: data.id,
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
    setInitialData(data);
  }, [data, methods]);

  const [initialData, setInitialData] = useState<any | null>(data);

  const { onSubmit, error, success, isLoading } = useBack<FormData>({
    url: "stores/update",
    method: "PUT",
    reset: methods.reset,
    initialData,
  });

  return (
    <>
      <div className="z-30 overflow-clip w-full">
        <Toolbar element="stores" action="Update Store" info={data} />
        <PageTitleInit />
         {errors ? (
                  <div className="m-10 pb-16 justify-center ">
                  <ErrorsItems />
                  </div>
                ) : isLoadingData ? (
                    <LoadingFormulario />
                ) : (
                  data && (
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
                index={data?.promedioProduct}
                select={categoryStore}
                label1="Store promedio price product"
                label2="Porsentaje de descuento promedio"
                data1="promedioProduct"
                data2="promedioDescuento"
              />
            </div>
            <div className="grow mb-auto basis-72 px-5">
              <Images
                imagenDefault={data?.imgStore}
                data="imgStore"
                label="Imagen de Tienda"
              />
              <LogoAndApariencia
                imagenDefaultfondo={data?.imgfondo}
                imagenDefaultportada={data?.imgPortada}
              />
              <Inventoy
                label1="Tipo de Inventario"
                label2="Codigo de barras"
                data1="tipo"
                data2="code"
              />
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
        </FormProvider> ) ) }
      </div>
    </>
  );
};
