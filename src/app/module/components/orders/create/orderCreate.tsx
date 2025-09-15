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
import { FaDollarSign, FaPlus } from "react-icons/fa";
import { Form_orders } from "../../../../../model/type_orders";
import { updateTable } from "../../../core/filtertableandSearch";
import { Modal_Component } from "../../../widgets/modal";
import { InputAutocomplet } from "../../../widgets/InputAutocomplet";
import { useEjecut } from "../../../../hooks/useEjecut";
import { BodyModal, DataItem } from "./bodyModal";
import { Number_Input } from "../../../widgets/number_Input";
import { MdDiscount } from "react-icons/md";
import { CuentaCreateOrder } from "./cuenta";
import { Input_Adress } from "../../../widgets/input_adress";
import { Spinner } from "@nextui-org/react";

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
    { name: "", uid: "actions" },
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
            className="bg-transparent h-[41.6px] w-full"
            dataAutocomplet={autocomplet}
            placeholder="search customer..."
          />
        </div>
      </>
    );
  };




  useEffect(() => {

    if (methods?.formState?.isSubmitSuccessful) {
      setdatosModal([]);
      setdatosTable([]);
    }
  }, [methods?.formState?.isSubmitSuccessful])




  return (
    <>
      <PageTitleInit />
      <div className="flex">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="justify-center w-full items-center lg:flex md:mx-2"
          >
            <div className="basis-72 grow px-5">
              <div className="flex flex-col border border-gray-300 rounded-2xl shadow-slate-200 shadow-xl gap-6 my-5 pb-10 px-3 py-2">
                <h1 className="text-2xl font-bold mt-5">Basic information</h1>
                <SearchCustomer />
                <Calendary_Input defaultValue="yes" data="timeOrder " label="Issue data" />
                <Input_text
                  data="numberOrder"
                  label="Number"
                  disable={true}
                  placeholder="ORD-001"
                />
              </div>
              <div className="flex flex-col border border-gray-300 rounded-2xl shadow-slate-200 shadow-xl gap-6 my-5 pb-10 px-3 py-2">
                <h1 className="text-2xl font-bold mt-5">Billing information</h1>
                <Input_Adress data='destination' placeholder='' label='Address destination *' coordinatesLat="deliveryLat" coordinatesLon='deliveryLng' />
                <Input_text data="city" label="City *" placeholder="" />
                <Input_text data="state" label="State *" placeholder="" />
                <Input_text data="zipcode" label="Zip code *" placeholder="" />
                <Input_text
                  data="TaxID"
                  label="Tax Id *"
                  placeholder="e.g EU3746473"
                />
              </div>
              <div className="flex flex-col border border-gray-300 rounded-2xl shadow-slate-200 shadow-xl gap-6 my-5 pb-10 px-3 py-2">
                <Number_Input pattern={undefined} tipe='number' data="discount" label="Discount " icon={<FaDollarSign />} />
                <Number_Input pattern={undefined} data="shipping" label="Shipping rate " tipe="number" icon={<FaDollarSign />} />
                <Number_Input pattern={undefined} tipe='number' data="taxrate" label="Tax rate ( % ) " icon={<MdDiscount />} />
              </div>
            </div>
            <div className="basis-72 grow mb-auto px-5">
              <div className="flex flex-col border border-gray-300 rounded-2xl shadow-slate-200 shadow-xl gap-6 my-5 pb-10 px-3 py-2">
                <h1 className="text-2xl font-bold mt-5">
                  Shipping information
                </h1>
                <Input_text data="city" label="City *" placeholder="" />
                <TextareaComponent
                  label="Delivery notes"
                  placeholder="e.g Leave package at the door"
                />
              </div>
              <div className="flex flex-col border border-gray-300 rounded-2xl shadow-slate-200 shadow-xl gap-6 my-5 pb-10 px-3 py-2">
                <h1 className="text-2xl font-bold mt-5">Line items</h1>
                {datosTable == undefined ?
                  <Spinner labelColor="danger" color="danger" label="Loading..." />
                  :
                  <Table columns={columns} notItem={true} />
                }
                <Modal_Component
                  component={<BodyModal setdatosModal={setdatosModal} datosModal={datosModal} />}
                  isAlert="yes"
                  title={"Add product to order"}
                  size="2xl"
                  onClick={() => { }}
                  onActionChange={(closeModal) => onActionChange(closeModal)}
                  className=""
                  onDiscardChange={onDiscardChange}
                  //  background={{from:"violet-500",opacity:"70",to:"teal-500"}}
                  scroll={"normal"}
                >
                  <button
                    aria-label="Agregar producto al pedido"
                    type="button"
                    className="bg-danger h-10 justify-center rounded-medium shadow-danger/40 shadow-lg text-danger-foreground text-small w-1/4 [&>svg]:max-w-[theme(spacing.8)] appearance-none box-border data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:z-10 data-[hover=true]:opacity-hover data-[pressed=true]:scale-[0.97] font-normal gap-2 group inline-flex items-center min-w-20 motion-reduce:transition-none outline-none overflow-hidden px-4 relative select-none subpixel-antialiased tap-highlight-transparent transition-transform-colors-opacity whitespace-nowrap z-0"
                  >
                    <span className="border border-white p-1 rounded-full">
                      <FaPlus />
                    </span>
                    Add item
                  </button>
                </Modal_Component>
              </div>

              <div>
                <CuentaCreateOrder datosModal={datosModal} />
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
