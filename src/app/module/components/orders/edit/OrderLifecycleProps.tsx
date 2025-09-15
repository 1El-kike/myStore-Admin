import { useState, useCallback, memo, useEffect, useMemo } from 'react';
import { Button, Chip, Badge, DropdownItem, DropdownSection, cn } from '@nextui-org/react';

import { MdCancel, MdCheckCircle, MdLocalShipping } from 'react-icons/md';
import { FiPackage } from 'react-icons/fi';
import { DeleteDocumentIcon, DropdownComponent } from '../../../widgets/Dropdown';
import { FaCheckCircle } from 'react-icons/fa';

export type OrderStatus = 'PENDING' | 'ACCEPTED' | 'PROCESSING' | 'DELIVERING' | 'DELIVERED' | 'CANCELLED'



export type Order = {
    id: number
    storeOrders: IItemsItem[]
    totalAmount: number
    globalStatus: OrderStatus
    createdAt: string
}

type Item = {

    productName: string
    productImage: string

}
export type IItemsItem = {
    id: number;
    quantity: number;
    price: number;
    status: OrderStatus;
    amount: number;
    items: Item[];
    store: {
        name: string
    }
    customer: ICustomer
    delivery: IDelivery
}
export type ICustomer = {
    name: string
    phone: string
    avatar: string
}
export type IDelivery = {
    address: string
    city: string
    status: string
}

interface OrderLifecycleProps {
    order: Order;
    onStatusChange: (orderId: any, newStatus: OrderStatus) => void;
    children: any
}


export const statusConfig: Record<any, { color: string; icon: JSX.Element; nextActions: OrderStatus[] }> = {

    PENDING: {
        color: 'warning',
        icon: <FiPackage className="text-lg" />,
        nextActions: ['ACCEPTED', 'CANCELLED']
    },
    ACCEPTED: {
        color: 'warning',
        icon: <MdCheckCircle className="text-lg" />,
        nextActions: ['PROCESSING', 'CANCELLED']
    },
    PROCESSING: {
        color: 'primary',
        icon: <MdCheckCircle className="text-lg" />,
        nextActions: ['DELIVERING', 'CANCELLED']
    },
    DELIVERING: {
        color: 'secondary',
        icon: <MdLocalShipping className="text-lg" />,
        nextActions: ['DELIVERED']
    },
    DELIVERED: {
        color: 'success',
        icon: <MdCheckCircle className="text-lg" />,
        nextActions: []
    },
    CANCELLED: {
        color: 'danger',
        icon: <MdCancel className="text-lg" />,
        nextActions: []
    }
};

const OrderLifecycleController = memo(({ order, onStatusChange, children }: OrderLifecycleProps) => {

    const currentStatusGlobal = order?.globalStatus;

    // Procesar storeOrders directamente desde props
    const storeOrders = useMemo(() => {
        return order?.storeOrders?.map(storeOrder => ({
            id: storeOrder.id,
            status: storeOrder.status,
            store: storeOrder.store.name
        })) || [];
    }, [order]);


    const [stores, orderStore] = useMemo(() => {
        const storesSet = new Set();
        order?.storeOrders?.forEach(store => storesSet.add(store));

        const storeData = Array.from(storesSet).map((store: any) => ({
            id: store.id,
            status: store.status,
            store: store.store.name
        }));
        return [storesSet, storeData];
    }, [order]); // <- Dependencia crítica

    const [currentStatus, setCurrentStatus] = useState<{
        id: number;
        status: OrderStatus;
        store: string
    }[]>(orderStore);


    // Función para manejar cambios de estado
    const handleStatusUpdate = useCallback(
        (newStatus: OrderStatus, id: number) => {
            onStatusChange(id, newStatus);
        },
        [onStatusChange]
    );

    const buttonConfig: Record<OrderStatus, { label: string; color: string }> = {
        PENDING: { label: 'Pending orden', color: 'warning' },
        ACCEPTED: { label: 'Acepted orden ', color: 'warning' },
        PROCESSING: { label: 'Processing order ', color: 'primary' },
        DELIVERING: { label: 'Shipped orden', color: 'secondary' },
        DELIVERED: { label: 'Delivered order', color: 'success' },
        CANCELLED: { label: 'Cancelar orden', color: 'danger' }
    };

    const renderStatusButtons = (status: OrderStatus, storeId: number) => (
        <Button
            key={status}
            color={buttonConfig[status].color as any}
            variant="flat"
            className="capitalize"
            onPressStart={() => handleStatusUpdate(status, storeId)}
            endContent={statusConfig[status]?.icon}
        >
            {buttonConfig[status].label}
        </Button>
    );


    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

    return (
        <div className="border w-full xl:w-1/2 md:m-auto lg:ml-auto mt-2 md:mt-10 xl:mt-44 md:ml-5  flex flex-col rounded-xl p-4 min-w-64 min-h-64 shadow-sm bg-white">
            <div className="flex items-center justify-between  mb-4">
                <div>
                    <h3 className="text-lg font-semibold">Orden #{order?.id}</h3>
                    {[...stores].map((store: any, index: number) =>
                        <p key={store?.store.name + index} className="text-sm text-gray-500">{store?.store.name}</p>
                    )}
                </div>
                <Badge content={order?.storeOrders?.length} color="primary">
                    <Chip
                        color={statusConfig[currentStatusGlobal]?.color as any}
                        variant="bordered"
                        startContent={statusConfig[currentStatusGlobal]?.icon}
                        classNames={{ base: "px-4 py-2" }}
                    >
                        <span className="capitalize">{currentStatusGlobal}</span>
                    </Chip>
                </Badge>
            </div>

            <div className="grid  grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                <div className="space-y-1">
                    <p className="text-sm ">Total: <span className='ml-2 font-bold text-xl mt-auto'>${Math.floor(Number(order?.totalAmount.toFixed(2)))}</span></p>

                </div>
                <div className="space-y-1">
                    <p className="text-sm font-medium">Products Name:</p>
                    <div className="flex flex-wrap gap-1">
                        {order?.storeOrders.map((product, index: number) => {
                            return product?.items.map(
                                element => {
                                    return (
                                        <Chip key={element.productName + index} size="sm" variant="flat" color="default">
                                            {element.productName}
                                        </Chip>
                                    )
                                }
                            )

                        })}
                    </div>
                </div>
            </div>


            <div className="flex h-full mt-auto flex-wrap gap-2 justify-end">
                {children}
                {!children ? stores.size > 1 ? (
                    (currentStatusGlobal !== 'DELIVERED' && currentStatusGlobal !== 'CANCELLED') &&
                    <DropdownComponent>
                        {storeOrders.map((store, index) => (
                            <DropdownItem
                                key={store.id + index}
                                color={buttonConfig[currentStatusGlobal].color as any}
                                textValue={`Estado tienda ${store.id}`}

                                description={'Status of store : ' + store.store}>

                                <div className="flex h-full mt-auto flex-wrap gap-2 justify-end">
                                    {statusConfig[store.status]?.nextActions.map(status =>
                                        renderStatusButtons(status, store.id)
                                    )}
                                </div>
                            </DropdownItem>
                        ))}
                        <DropdownSection title="Danger zone">
                            <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                description="Permanently delete the file"
                                shortcut="⌘⇧D"
                                startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
                            >
                                Delete file
                            </DropdownItem>
                        </DropdownSection>
                    </DropdownComponent>
                ) : (
                    <div className="flex h-full mt-auto flex-wrap gap-2 justify-end">
                        {statusConfig[currentStatusGlobal]?.nextActions.map(status =>
                            renderStatusButtons(status, currentStatus[0].id)
                        )}
                    </div>
                )
                    : null}
            </div>



            {currentStatusGlobal === 'CANCELLED' && (
                <div className="mt-4 p-3 bg-red-50 rounded-lg text-red-600 text-sm">
                    <MdCancel className="inline-block mr-2" />
                    This order has been canceled and cannot be modified.
                </div>
            )}
            {currentStatusGlobal === 'DELIVERED' && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-blue-600 text-sm">
                    <FaCheckCircle className="inline-block mr-2" />
                    This order has been successfully completed.
                </div>
            )}

        </div>
    );
});

export default OrderLifecycleController;