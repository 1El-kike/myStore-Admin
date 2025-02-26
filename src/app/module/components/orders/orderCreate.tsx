import React, { useEffect, useMemo, useRef, useState } from "react";
import { PageTitleInit } from "../../layout/tollbar/tiltleInit";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import useBack from "../../../hooks/useBack";
import { Submit } from "../../widgets/Submit";
import { Input_text } from "../../widgets/Input_text";
import { Calendary_Input } from "../../widgets/calendary_Input";
import { TextareaComponent } from "../../widgets/textarea";
import { Table } from "../../widgets/GroupBy";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { Form_orders } from "../../../../model/type_orders";
import { updateTable } from "../../core/filtertableandSearch";
import { Modal_Component } from "../../widgets/modal";
import { InputAutocomplet } from "../../widgets/InputAutocomplet";
import { useEjecut } from "../../../hooks/useEjecut";
import { Alert } from "@nextui-org/react";
import { BodyModal, DataItem } from "./bodyModal";

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


  const FooterModal = ()=>{
    return(
      <>
        {showAlert && (
            <div className="flex animate-opacityonly flex-col gap-4 w-full">
              <Alert
                key={"error confirm"}
                color="danger"
                variant="flat"
                className="mb-4"
                onClose={() => setShowAlert(false)}
                title={`This is a variant alert`}
              >
                <div className="flex flex-col">
                  <p className="font-bold">Error de validación</p>
                  <ul className="list-disc pl-4">
                    {alertMessage.map((msg, i) => (
                      <li key={i}>{msg}</li>
                    ))}
                  </ul>
                </div>
              </Alert>
            </div>
          )}
      </>
    )
  }
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string[]>([]);

  const onActionChange = (closeModal: () => void) => {
    // Validar campos requeridos
    const errores = datosModal
      .map((item: any, index: number) => ({
        row: index + 1,
        missing: [
          ...(!item?.id ? ["Producto"] : []),
          ...(!item?.quantity ? ["Cantidad"] : []),
          ...(!item?.price ? ["Precio"] : []),
        ],
      }))
      .filter((e: any) => e.missing.length > 0);

    if (errores.length > 0) {
      const messages = errores.map(
        (e: any) => `Fila ${e.row}: ${e.missing.join(", ")}`
      );
      setAlertMessage(messages);
      setShowAlert(true);
      /* setTimeout(()=>{
        setShowAlert(false)
      },3000) */
      return false;
    }
    
    setdatosTable(datosModal);
    setShowAlert(false);
    closeModal();
    return true;
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
    //console.log(JSON.stringify(methods.getValues(), null, 2),data);
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
            /*  startContent={
              <Avatar alt="customer" className="w-6 h-6" src={port } />
            } */
            className="w-full h-[41.6px]"
            dataAutocomplet={autocomplet}
            placeholder="search customer..."
          />
        </div>
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
                  footer={<FooterModal/>}
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
                <Submit
                  error={error}
                  isLoading={isLoading}
                  reset={methods.reset}
                  bottom1="Schedule"
                  bottom2="Add Orders"
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
