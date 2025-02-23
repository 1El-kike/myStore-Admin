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
import { MdRemove } from "react-icons/md";
import { Button } from "@nextui-org/react";

// Define el tipo para los datos entrantes
type DataItem = {
  id: string | null;
  name: string | null;
};

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

  const BodyModal = () => {
    const { control } = useFormContext();
    const { data } = useEjecut({ url: `allProducts` });
    const { fields, append, remove } = useFieldArray({
      control,
      name: "items",
    });

    // Observar items eficientemente
    const items = useWatch({ control, name: "items" });
    const lastItem = useMemo(() => items?.[items.length - 1], [items]);

    // Memoizar datos de autocompletado
    const autocomplet = useMemo(
      () =>
        data?.map((item: DataItem) => ({
          key: item.id,
          label: item.name,
        })) || [],
      [data]
    );

    const addData = (newData: any, index: number) => {
      const formatData = {
        id: newData?.id,
        name: newData?.name,
        image: newData?.image,
        tipo: newData?.tipo,
        status: newData?.inventoryStatus,
        price: newData?.price,
        quantity: methods.getValues(`items.${index}.quantity`),
      };
      setdatosModal((prev: any) => {
        const newModalData = [...prev];
        newModalData[index] = formatData; // Actualizar posición del índice
        return newModalData;
      });
    };

    // Efecto para actualizar precios
    useEffect(() => {
      const subscription = methods.watch((value, { name }) => {
        if (name?.startsWith("items.") && name?.endsWith(".productId")) {
          const index = Number(name.split(".")[1]);
          const selectedProduct = data?.find(
            (item: DataItem) => item.id == value.items?.[index]?.productId
          );
          if (selectedProduct?.price) {
            methods.setValue(`items.${index}.price`, selectedProduct.price, {
              shouldDirty: false,
            });
          }
          addData(selectedProduct, index);
        }
      });

      return () => subscription.unsubscribe();
    }, [methods, data]);
    // Control de cantidad
    const moreQuantity = (index: number) => {
      const currentQuantity = methods.getValues(`items.${index}.quantity`) || 1;
      methods.setValue(`items.${index}.quantity`, Number(currentQuantity) + 1);
      // Actualizar datosModal usando el índice directo
      setdatosModal((prev: any) =>
        prev.map((item: any, i: number) =>
          i === index
            ? { ...item, quantity: Number(currentQuantity) + 1 }
            : item
        )
      );
    };

    const lessQuantity = (index: number) => {
      const currentQuantity = methods.getValues(`items.${index}.quantity`) || 1;
      if (currentQuantity > 1) {
        methods.setValue(
          `items.${index}.quantity`,
          Number(currentQuantity) - 1
        );
      }
      // Actualizar datosModal usando el índice directo
      setdatosModal((prev: any) =>
        prev.map((item: any, i: number) =>
          i === index
            ? { ...item, quantity: Number(currentQuantity) - 1 }
            : item
        )
      );
    };

    // Función para agregar productos con validación
    const addProduct = () => {
      if (!lastItem?.productId) return;
      append({ productId: null, quantity: 1, price: null });
    };

    // Función para eliminar o vaciar producto
    const handleRemove = (index: number) => {
      if (fields.length > 1) {
        remove(index);
        setdatosModal((prev: any) =>
          prev.filter((_: any, i: number) => i !== index)
        ); // Eliminar del mismo índice
      } else {
        // Si solo queda un elemento, vaciamos sus campos
        methods.setValue(`items.0.productId`, null);
        methods.setValue(`items.0.quantity`, 1);
        methods.setValue(`items.0.price`, null);
        setdatosModal([]);
      }
    };

    return (
      <>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex justify-between items-center mb-4"
          >
            <InputAutocomplet
              label="Select products"
              data={`items.${index}.productId`}
              dataAutocomplet={autocomplet}
             // onClear={handleRemove}
              placeholder="Search product..."
            />

            {methods.watch(`items.${index}.productId`) && (
              <div className="flex justify-center items-center gap-1 animate-appearance-in">
                <div
                  onClick={() => handleRemove(index)}
                  aria-label="Eliminar producto"
                  className="bg-gradient-to-br mr-1 hover:scale-110 duration-250 active:scale-95 focus:ring-2 cursor-pointer from-slate-500 to-slate-600 rounded-lg p-2"
                >
                  <FaTrashAlt color="white" />
                </div>
                <div
                  onClick={() => lessQuantity(index)}
                  aria-label="Reducir cantidad"
                  className="bg-gradient-to-br hover:scale-110 duration-250 active:scale-95 focus:ring-2 cursor-pointer from-slate-50 to-slate-200 rounded-lg p-1"
                >
                  <MdRemove size={24} />
                </div>
                <div className="mx-2 text-md">
                  {methods.watch(`items.${index}.quantity`)}
                </div>
                <div
                  onClick={() => moreQuantity(index)}
                  aria-label="Aumentar cantidad"
                  className="bg-gradient-to-br hover:scale-110 active:scale-95 cursor-pointer duration-250 from-sky-500 to-lime-500 rounded-lg p-2"
                >
                  <FaPlus />
                </div>
              </div>
            )}
          </div>
        ))}

        {lastItem?.productId && (
          <div className="mb-5 mt-1">
            <Button
              onPress={addProduct}
              className="animate-appearance-in"
              color="success"
              startContent={<FaPlus />}
              variant="shadow"
            >
              Add Product
            </Button>
          </div>
        )}
      </>
    );
  };

  const onActionChange = () => {
    setdatosTable(datosModal);
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
    console.log(JSON.stringify(methods.getValues(),null,2))
    return (
      <>
      <div>
       <label
      htmlFor='userId'
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
                  component={<BodyModal />}
                  title={"Add product to order"}
                  size="2xl"
                  onClick={() => {}}
                  onActionChange={onActionChange}
                  className=""
                  
                  onDiscardChange={onDiscardChange}
                  scroll={"inside"}
                >
                  <button
                    aria-label="Agregar producto al pedido"
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
