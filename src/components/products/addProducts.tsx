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
import { FormData } from "../../interface/FormData";
import { FormProvider, useForm } from "react-hook-form";
import useBack from "../../hooks/useBack";

// Definimos la interfaz para los datos del formulario

export const AddProducts: React.FC = () => {
  

  const methods = useForm({
    defaultValues: {
      name:'',
    description: "",
    category: "",
    tipo: "",
    quantity: 0,
    sku:"",
    image: [],
    price: 0,
    inventoryStatus: "",
    cantidad: 0,        
    selling_type: 0,
    items_weight:0,
    campo:0,
    error:"",
    length:0,
    breadth:0,
    website_admin:0,
    width:0
    }
  });
  const { onSubmit, error,success,isLoading } = useBack<FormData>({
    url: "allProducts/create"
    
  });


  return (
    <>
      <div className="z-30 overflow-clip w-full">
        <Toolbar />
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className=" lg:flex  md:mx-2 justify-center items-center "
          >
            <div className="grow basis-72 px-5 ">
              <Description />
              <Category />
              <Inventoy />
              <Selling_Type  />
            </div>
            <div className="grow mb-auto basis-72 px-5">
              <Images />
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
