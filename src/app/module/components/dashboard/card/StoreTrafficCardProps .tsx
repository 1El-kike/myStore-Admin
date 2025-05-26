import { Image, ScrollShadow } from '@nextui-org/react';
import { FaStore, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { port } from '../../../../../config/env';

interface StoreTrafficData {
    id: number;
    name: string;
    location: string;
    totalVisitors: number;
    newCustomers: number;
    returningCustomers: number;
    trendPercentage: number;
}

const StoreTrafficCard = ({ store }: { store: StoreTrafficData }) => {
    const isPositive = store.trendPercentage >= 0;
    const image = 'uploads/1744988831585-palco4.jpg'

    return (
        <div className="bg-white overflow-hidden relative mt-3 p-4 rounded-xl shadow-sm  hover:shadow-md transition-shadow border border-gray-100">
            <div className='h-full clip-edit  w-full bottom-0 z-10 opacity-10 aspect-auto absolute'>
                <Image
                    isBlurred
                    alt="Album Cover"
                    className="scale-105 justify-center w-full aspect-square m-auto rounded-2xl"
                    src={port + image}
                // width={240}
                />
            </div>
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <FaStore className="text-purple-600 shrink-0" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">{store.name}</h3>
                            <p className="text-sm text-gray-500">{store.location}</p>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                                {store.totalVisitors.toLocaleString()}
                            </div>
                            <span className="text-sm text-gray-500">Total visitas</span>
                        </div>

                        <div className="text-center border-x">
                            <div className="text-2xl font-bold text-green-600">
                                {store.newCustomers.toLocaleString()}
                            </div>
                            <span className="text-sm text-gray-500">Nuevos clientes</span>
                        </div>

                        <div className="text-center">
                            <div className="text-2xl font-bold text-amber-600">
                                {store.returningCustomers.toLocaleString()}
                            </div>
                            <span className="text-sm text-gray-500">Clientes recurrentes</span>
                        </div>
                    </div>
                </div>

                <div className={`flex items-center gap-1 ml-4 ${isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {isPositive ? <FaArrowUp /> : <FaArrowDown />}
                    <span className="text-sm font-medium">
                        {Math.abs(store.trendPercentage)}%
                    </span>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Ratio conversión: {((store.newCustomers / store.totalVisitors) * 100).toFixed(1)}%
                </span>
                <span className="text-gray-500">
                    Última actualización: Hoy
                </span>
            </div>
        </div>
    );
};

export const StoreTrafficList = () => {
    const stores: StoreTrafficData[] = [
        {
            id: 1,
            name: 'Tienda Centro',
            location: 'Av. Principal 123',
            totalVisitors: 2450,
            newCustomers: 420,
            returningCustomers: 670,
            trendPercentage: 12.5
        },
        {
            id: 2,
            name: 'Tienda Norte',
            location: 'Calle Secundaria 456',
            totalVisitors: 1820,
            newCustomers: 310,
            returningCustomers: 490,
            trendPercentage: -5.4
        },
        {
            id: 3,
            name: 'Tienda Sur',
            location: 'Boulevard Comercial 789',
            totalVisitors: 3120,
            newCustomers: 580,
            returningCustomers: 920,
            trendPercentage: 8.2
        }
    ];

    const scrollfunction = () => {

    }

    return (
        <div className='flex '>

            <div className="grid animate-appearance-in gap-4 h-[320px]   grow basis-[90%] p-2">
                <ScrollShadow className='overflow-x-hidden scroll-m-2 pr-4'>
                    {stores.map((store) => (
                        <StoreTrafficCard key={store.id} store={store} />
                    ))}
                </ScrollShadow>
            </div>
        </div>
    );
};