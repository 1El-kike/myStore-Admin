import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { DataUseEjecut, useEjecut } from "../../../../hooks/useEjecut";
import useBack from "../../../../hooks/useBack";
import { Toolbar } from "../../../widgets/Toolbar";
import { Description } from "../../../widgets/description";
import { Category } from "../../../widgets/category";
import { Images } from "../../../widgets/addImage";
import { Inventoy } from "../../../widgets/Inventoy";
import { Selling_Type } from "../../../widgets/Selling_type";
import { Submit } from "../../../widgets/Submit";
import { PageTitleInit } from "../../../layout/tollbar/tiltleInit";
import {
  categoryProduct,
  Form_product,
} from "../../../../../model/type_product";
import { Shipping_Delivery } from "../../../widgets/Shipping_Delivery";
import { Size } from "../../../widgets/size";
import { Pricing } from "../../../widgets/Pricing";

export const EditProducts = () => {
  const id = useParams();
  const methods = useForm(Form_product);
  const { data }: DataUseEjecut = useEjecut({
    url: `allProducts/${id.idProduct}`,
    submit: methods.formState.isSubmitting,
  });

  useEffect(() => {
    if (data) {
      methods.reset({
        id: data.id,
        name: data.name,
        description: data.description,
        category: data.category,
        tipo: data.tipo,
        quantity_total: data.quantity_total,
        sku: data.sku,
        image: data.image,
        price: data.price,
        selling_type: data.selling_type,
        items_weight: data.items_weight || "",
        length: data.length,
        breadth: data.breadth,
        status: data.status,
        comparePrice: data.comparePrice,
        width: data.width,
      });
    }
    setInitialData(data);
  }, [data, methods]);

  const [initialData, setInitialData] = useState<any | null>(data);

  const { onSubmit, error, success, isLoading } = useBack<FormData>({
    url: "allProducts/update",
    method: "PUT",
    reset: methods.reset,
    initialData,
  });


  return (
    <>
      <div className="z-30 overflow-clip w-full">
        <Toolbar element="product" action="Update Product"  />
        <PageTitleInit />
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className=" lg:flex  md:mx-2 justify-center items-center "
          >
            <div className="grow mb-auto basis-72 px-5 ">
              <Description name="product" />
            {/*   <Category
                select={categoryProduct}
                label1="Product Category"
                label2=" Product Type"
                data1="category"
                data2="tipo"
              /> */}
              <Inventoy
                label1="Quantity"
                label2="SKU(Option)"
                data1="quantity_total"
                data2="sku"
              />
              
              {data?.selling_type && 
              <Selling_Type  indexdefault={data?.selling_type == 'In-store' ? 0 : data?.selling_type == 'Online' ? 1 :  data?.selling_type == 'both' ? 2 : 0}/>
              }
            </div>
            <div className="grow mb-auto basis-72 px-5">
              <Images data="image" label="Product Images" imagenDefault={data?.image} />
              { data?.category === "Food" && (
                <div className="animate-opacity">
                  <Shipping_Delivery />
                </div>
              )}
              {data?.category === "Clothes" && (
                <div className="animate-opacity">
                  <Size />
                </div>
              )}
              <Pricing  />
              <div>
                <Submit
                  error={error}
                  isLoading={isLoading}
                  reset={methods.reset}
                  bottom1="Schedule"
                  bottom2="Update Product"
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
