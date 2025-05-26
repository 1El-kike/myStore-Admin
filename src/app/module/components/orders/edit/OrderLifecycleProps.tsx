import { useState, useCallback, memo } from 'react';
import { Button, Chip, Badge, useDisclosure } from '@nextui-org/react';
import { MdCancel, MdCheckCircle, MdDoneAll, MdLocalShipping, MdPending } from 'react-icons/md';
import { FiArrowDown, FiArrowLeft, FiArrowRight, FiPackage } from 'react-icons/fi';

type OrderStatus = 'PENDING' | 'ACCEPTED' | 'DELIVERING' | 'DELIVERED' | 'CANCELLED'


export type Order = {
    id: number
    items: IItemsItem[]
    totalAmount: number
    status: OrderStatus
    createdAt: string
}
export type IItemsItem = {
    quantity: number
    price: number
    amount: number
    productName: string
    productImage: string
    storeName: string
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
}


const statusConfig: Record<any, { color: string; icon: JSX.Element; nextActions: OrderStatus[] }> = {

    PENDING: {
        color: 'warning',
        icon: <FiPackage className="text-lg" />,
        nextActions: ['ACCEPTED', 'CANCELLED']
    },
    ACCEPTED: {
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

const OrderLifecycleController = memo(({ order, onStatusChange }: OrderLifecycleProps) => {
    const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order?.status);
    const { isOpen, onOpen, onClose } = useDisclosure();



    const handleStatusUpdate = useCallback(
        (newStatus: OrderStatus) => {
            setCurrentStatus(newStatus);
            onStatusChange(order?.id, newStatus);
            onClose();
        },
        [onStatusChange, order?.id, onClose]
    );

    const getStatusButton = (status: any) => {
        if (!statusConfig[currentStatus].nextActions.includes(status)) return null;

        const buttonConfig = {
            PENDING: { label: 'Accepted orden', color: 'primary' },
            ACCEPTED: { label: 'Accepted Orden', color: 'primary' },
            DELIVERING: { label: 'Delivering order', color: 'secondary' },
            DELIVERED: { label: 'Confirmar Entrega', color: 'success' },
            CANCELLED: { label: 'Cancelled Orden', color: 'danger' }
        }[status as OrderStatus];

        return (
            <Button
                key={status}
                color={buttonConfig.color as any}
                variant="flat"
                className="capitalize"
                onPress={() => handleStatusUpdate(status)}
                endContent={statusConfig[status]?.icon}
            >
                {buttonConfig.label}
            </Button>
        );
    };

    const store = new Set()
    order?.items?.map(storeName => {
        store.add(storeName?.storeName)
    })

    return (
        <div className="border mt-10 flex flex-col rounded-xl p-4 min-w-96 min-h-64 shadow-sm bg-white">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold">Orden #{order?.id}</h3>
                    {[...store].map((store: any) =>
                        <p className="text-sm text-gray-500">{store}</p>
                    )}
                </div>
                <Badge content={order?.items?.length} color="primary">
                    <Chip
                        color={statusConfig[currentStatus]?.color as any}
                        variant="bordered"
                        startContent={statusConfig[currentStatus]?.icon}
                        classNames={{ base: "px-4 py-2" }}
                    >
                        <span className="capitalize">{currentStatus}</span>
                    </Chip>
                </Badge>
            </div>

            <div className="grid  grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                <div className="space-y-1">
                    <p className="text-sm font-medium">Cliente: {order?.items[0]?.customer?.name}</p>
                    <p className="text-sm">Total: ${order?.totalAmount.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{new Date(order?.createdAt).toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-medium">Productos:</p>
                    <div className="flex flex-wrap gap-1">
                        {order?.items.map((product) => (
                            <Chip key={product.productName} size="sm" variant="flat" color="default">
                                {product.productName}
                            </Chip>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex h-full mt-auto flex-wrap gap-2 justify-end">
                {statusConfig[currentStatus]?.nextActions.map((status: OrderStatus) => getStatusButton(status))}
            </div>

            {currentStatus === 'CANCELLED' && (
                <div className="mt-4 p-3 bg-red-50 rounded-lg text-red-600 text-sm">
                    <MdCancel className="inline-block mr-2" />
                    Esta orden fue cancelada y no puede ser modificada
                </div>
            )}
        </div>
    );
});

export default OrderLifecycleController;