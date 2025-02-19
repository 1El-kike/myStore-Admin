import React, { useEffect, useState } from "react";
import { PageTitleInit } from "../../layout/tollbar/tiltleInit";
import { FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form";
import useBack from "../../../hooks/useBack";
import { Submit } from "../../widgets/Submit";
import { Input_text } from "../../widgets/Input_text";
import { Calendary_Input } from "../../widgets/calendary_Input";
import { TextareaComponent } from "../../widgets/textarea";
import { Table } from "../../widgets/GroupBy";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import { Form_orders } from "../../../../model/type_orders";
import { updateTable } from "../../core/filtertableandSearch";
import { Modal_Component } from "../../widgets/modal";
import { InputAutocomplet } from "../../widgets/InputAutocomplet";
import { useEjecut } from "../../../hooks/useEjecut";
import { MdRemove } from "react-icons/md";
import { Button } from "@nextui-org/react";
import { UserIcon } from "../../widgets/iconSVG";

interface AutocompleteItem {
  key: string | null;
  label: string | null;
}

// Define el tipo para los datos entrantes
type DataItem = {
  id: string | null;
  name: string | null;
};

export const OrderCreate = () => {
  const methods = useForm(Form_orders);
  const { setdatosTable } = updateTable();
  const { onSubmit, error, success, isLoading } = useBack<FormData>({
    url: "orders/create",
    reset: methods.reset,
  });
  const { control, setValue, getValues } = useFormContext();

  

  const columns = [
    { name: "PRODUCT", uid: "order" },
    { name: "QUANTITY", uid: "methodPayment" },
    { name: "UNIT PRICE", uid: "customer" },
    { name: "", uid: "actions" },
  ];

  const addProduct = () => {
    setdatosTable();
  };

  const BodyModal = () => {
    const [count, setcount] = useState(1)
    const [autocomplet, setautocomplet] = useState<Array<AutocompleteItem>>([
      {
        key: null,
        label: null,
      },
    ]);
    const { data, isLoadingData, errors } = useEjecut({
      url: `allProducts`,
    });

    const { fields, append, remove } = useFieldArray({
      control,
      name: "items"
    });

     // Función para agregar nuevo producto
  const handleAddProduct = () => {
    append({
      productId: null,
      quantity: 1,
      price: null
    });
  };

    useEffect(() => {
      if (data) {
        const formattedData: Array<AutocompleteItem> = data.map(
          (item: DataItem) => ({
            key: item.id,
            label: item.name,
          })
        );
        setautocomplet(formattedData);
      }
    }, [data]);

    const moreQuantity = () => {
      // Obtener el valor actual
      const currentQuantity = methods.getValues("items.0.quantity") || 1; // Si es null, usa 0
      // Incrementar en 1 y actualizar el valor
      methods.setValue("items.0.quantity", Number(currentQuantity) + 1);
    };
    const lessQuantity = () => {
      // Obtener el valor actual
      const currentQuantity = methods.getValues("items.0.quantity") || 1; // Si es null, usa 0
      // Incrementar en 1 y actualizar el valor
      methods.setValue("items.0.quantity", Number(currentQuantity) - 1);
    };
    const  OtherProduct = ()=> {
      setcount(count + 1)
    }
 
    return (
      <>
      {
        Array.from({ length: count }).map((_, index) => (
          // Contenido a repetir. "index" será 0, 1, 2, 3, 4 (5 iteraciones)
          <div key={index} className=" flex justify-between items-center">
          <InputAutocomplet
            label="Select products"
            data="items[0].productId"
            dataAutocomplet={autocomplet}
          />
          {methods.watch("items.0.productId") && (
            <div className="flex justify-center items-center gap-1 animate-appearance-in">
              <div 
              onClick={lessQuantity}
              className="bg-gradient-to-br hover:scale-110 duration-250  active:scale-95 focus:ring-2 cursor-pointer  from-slate-50 to-slate-200 rounded-lg p-1">
                <MdRemove size={24} />
              </div>
              <div className="mx-2 text-md">
                {methods.watch("items.0.quantity")}
              </div>
              <div
                onClick={moreQuantity}
                className="bg-gradient-to-br hover:scale-110 active:scale-95 cursor-pointer duration-250  from-sky-500 to-lime-500 rounded-lg p-2"
              >
                <FaPlus />
              </div>
            </div>
          )}
        </div>
        ))
       
      }

        {methods.watch("items.0.productId") && <div className="mb-5 mt-1">
        <Button onPress={OtherProduct} className="animate-appearance-in" color="success" startContent={<FaPencilAlt />} variant="shadow">
       <FaPlus/>
      </Button>
        </div>}
      </>
    );
  };

  return (
    <>
      <PageTitleInit />
      <div className="flex">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className=" lg:flex w-full  md:mx-2 justify-center items-center "
          >
            <div className="grow basis-72 px-5 ">
              <div className="shadow-xl pb-10 shadow-slate-200 border my-5 px-3 py-2 flex flex-col gap-6 border-gray-300 rounded-2xl">
                <h1 className="text-2xl mt-5 font-bold">Basic information</h1>
                <Input_text data="customer" label="Customer" placeholder="" />
                <Calendary_Input data="timeOrder" label="Issue data" />
                <Input_text
                  data="numberOrder"
                  label="Number"
                  disable={true}
                  placeholder="ORD-001"
                />
              </div>
              <div className="shadow-xl pb-10 shadow-slate-200 border my-5 px-3 py-2 flex flex-col gap-6 border-gray-300 rounded-2xl">
                <h1 className="text-2xl mt-5 font-bold">Billing information</h1>
                <Input_text data="city" label="City *" placeholder="" />
                <Input_text data="address" label="Address *" placeholder="" />
                <Input_text data="state" label="State *" placeholder="" />
                <Input_text data="zipcode" label="Zip code *" placeholder="" />
                <Input_text
                  data="TaxID"
                  label="Tax Id *"
                  placeholder="e.g EU3746473"
                />
              </div>
            </div>
            <div className="grow mb-auto basis-72 px-5">
              <div className="shadow-xl pb-10 shadow-slate-200 border my-5 px-3 py-2 flex flex-col gap-6 border-gray-300 rounded-2xl">
                <h1 className="text-2xl mt-5 font-bold">
                  Shipping information
                </h1>
                <Input_text data="city" label="City *" placeholder="" />
                <TextareaComponent
                  label="Delivery notes"
                  placeholder="e.g Leave package at the door"
                />
              </div>
              <div className="shadow-xl pb-10 shadow-slate-200 border my-5 px-3 py-2 flex flex-col gap-6 border-gray-300 rounded-2xl">
                <h1 className="text-2xl mt-5 font-bold">Line items</h1>
                <Table columns={columns} />
                <Modal_Component
                  component={<BodyModal />}
                  title={"Add product to order"}
                  size="xl"
                  onClick={() => {}}
                  className=""
                  scroll={"inside"}
                >
                  <button className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none shadow-lg shadow-danger/40 bg-danger text-danger-foreground data-[hover=true]:opacity-hover w-1/4">
                    <span className="p-1 rounded-full border border-white">
                      <FaPlus />
                    </span>
                    Add item
                  </button>
                </Modal_Component>
              </div>
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
