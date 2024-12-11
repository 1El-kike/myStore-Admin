import React from "react";
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

// Definimos la interfaz para los datos del formulario

export const AddProducts: React.FC = () => {
  
         
  const methods = useForm(Form_product);
  const { onSubmit, error,success,isLoading } = useBack<FormData>({
    url: "allProducts/create",
    reset: methods.reset
  });


  return (
    <>
      <div className="z-30 overflow-clip w-full">
        <Toolbar element={"products"} action={"Add New Product"}/>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className=" lg:flex  md:mx-2 justify-center items-center "
          >
            <div className="grow basis-72 px-5 ">
              <Description  name="product"/>
              <Category select={categoryProduct} label1="Product Category" label2=" Product Type" data1="category" data2="tipo" />
              <Inventoy label1="Quantity" label2="SKU(Option)" data1="quantity_total" data2="sku"/>
              <Selling_Type  />
            </div>
            <div className="grow mb-auto basis-72 px-5">
              <Images data="image" label="Product Images"/>
              <Shipping_Delivery />
              <Pricing />
              <div>
                <Submit error={error} isLoading={isLoading} reset={methods.reset} bottom1="Schedule" bottom2="Add Product" success={success} />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
