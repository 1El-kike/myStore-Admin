import React, { useEffect, useMemo, useState } from "react";
import { PageTitleInit } from "../../../layout/tollbar/tiltleInit";
import {
  FormProvider,
  useForm,
} from "react-hook-form";
import useBack from "../../../../hooks/useBack";
import { Submit } from "../../../widgets/Submit";
import { Input_text } from "../../../widgets/Input_text";
import { Calendary_Input } from "../../../widgets/calendary_Input";
import { TextareaComponent } from "../../../widgets/textarea";
import { Table } from "../../../widgets/GroupBy";
import { FaPlus } from "react-icons/fa";
import { Form_orders } from "../../../../../model/type_orders";
import { updateTable } from "../../../core/filtertableandSearch";
import { Modal_Component } from "../../../widgets/modal";
import { InputAutocomplet } from "../../../widgets/InputAutocomplet";
import { useEjecut } from "../../../../hooks/useEjecut";
import { Alert } from "@nextui-org/react";
import { BodyModal, DataItem } from "./bodyModal";
import { Number_Input } from "../../../widgets/number_Input";

// Define el tipo para los datos entrantes


export const OrderCreate = () => {
  const methods = useForm(Form_orders);
  const { setdatosTable, datosTable } = updateTable();
  const [datosModal, setdatosModal] = useState<any>([]);
  const { onSubmit, error, success, isLoading } = useBack<FormData>({
    url: "orders/create",
    reset: methods.reset,
  });
  const columns = [
    { name: "PRODUCT", uid: "name" },
    { name: "QUANTITY", uid: "quantity" },
    { name: "UNIT PRICE", uid: "price" },
  ];


  useEffect(() => {
    setdatosModal(datosModal)
   }, [datosModal])
   

  const onActionChange = (closeModal: () => void) => {
    setdatosTable(datosModal);
    const itemsArray = datosModal.map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));
    // Establecer el nuevo array en "items"
    methods.setValue("items", itemsArray);
    closeModal();
    
  };

  const onDiscardChange = () => {
    if (datosTable.length == 0) {
      methods.setValue("items", [
        {
          productId: null,
          quantity: 1,
          price: null,
        },
      ]);
      setdatosModal([]);
    } else {
      // console.log(datosTable,datosModal)
      const itemsArray = datosTable.map((item: any) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));
      // Establecer el nuevo array en "items"
      methods.setValue("items", itemsArray);
       setdatosModal(datosTable);
    }
  };

  const SearchCustomer = () => {
    const { data } = useEjecut({ url: `customer` });
    // Memoizar datos de autocompletado
    const autocomplet = useMemo(
      () =>
        data?.map((item: DataItem) => ({
          key: item.id,
          label: item.name,
        })) || [],
      [data]
    );
    
    return (
      <>
        <div>
          <label
            htmlFor="userId"
            aria-label="Seleccionar input"
            className={`block mb-2 capitalize  text-base font-medium text-gray-900 `}
          >
            Customer
          </label>
          <InputAutocomplet
            label=""
            data={`userId`}
            variant="faded"
            className="w-full h-[41.6px]"
            dataAutocomplet={autocomplet}
            placeholder="search customer..."
          />
        </div>
      </>
    );
  };


  const Cuenta =()=>{

// Dentro de tu componente
const subtotal = useMemo(() => {
  return datosTable.reduce((accumulator:any, item:any) => {
    // Verificar que price y quantity sean números válidos
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return accumulator + (price * quantity);
  }, 0);
}, [datosModal])

    return <>
    <div className="flex justify-end mt-10">

    <div className="flex flex-col gap-5 w-1/2">

        <div className="flex justify-between w-full">
          <h1>Subtotal</h1>
          <h2> ${subtotal} </h2>
        </div>
        <div className="flex justify-between w-full">
          <h1>Discount</h1>
          <h2> - </h2>
        </div>
        <div className="flex justify-between w-full">
          <h1>Shipping</h1>
          <h2> - </h2>
        </div>
        <div className="flex justify-between w-full">
          <h1>Taxes</h1>
          <h2>$24.00</h2>
        </div>
        <div className="flex justify-between w-full">
          <h1 className="font-bold">Total</h1>
          <h2 className="font-bold">$24.00</h2>
        </div>
    </div>
    </div>
    </>
  }

 

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
                <SearchCustomer />
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
              <div className="shadow-xl pb-10 shadow-slate-200 border my-5 px-3 py-2 flex flex-col gap-6 border-gray-300 rounded-2xl">
              <Number_Input data="discount" label="Discount " />
              <Number_Input data="rate" label="Shipping rate "  />
              <Number_Input data="taxrate" label="Tax rate ( % ) "  />
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
                  component={<BodyModal setdatosModal={setdatosModal} datosModal={datosModal} />}
                  isAlert="yes"
                  title={"Add product to order"}
                  size="2xl"
                  onClick={() => {}}
                  onActionChange={(closeModal) => onActionChange(closeModal)}
                  className=""
                  onDiscardChange={onDiscardChange}
                  scroll={"normal"}
                >
                  <button
                    aria-label="Agregar producto al pedido"
                    type="button"
                    className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none shadow-lg shadow-danger/40 bg-danger text-danger-foreground data-[hover=true]:opacity-hover w-1/4"
                  >
                    <span className="p-1 rounded-full border border-white">
                      <FaPlus />
                    </span>
                    Add item
                  </button>
                </Modal_Component>
              </div>
             
                <div>
                  <Cuenta/>
                </div>
              <div>
                <Submit
                  error={error}
                  isLoading={isLoading}
                  reset={methods.reset}
                  bottom1="Schedule"
                  bottom2="Create Orders"
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
