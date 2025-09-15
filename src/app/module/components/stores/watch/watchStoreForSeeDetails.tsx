import React from 'react'
import { TabsNext } from '../../../widgets/tabs'
import { useEjecut } from '../../../../hooks/useEjecut';
import { Link, useParams } from 'react-router-dom';
import { PageTitleInit } from '../../../layout/tollbar/tiltleInit';
import { ErrorsItems } from '../../../errors/errorsItems';
import LoadingWatch from '../../../widgets/loading/loadingWatch';
import { Option } from '../../../../../interface/TypeTabs';
import { ImUsers } from 'react-icons/im';
import { MdOutlineInventory } from 'react-icons/md';
import { Avatar, Image, Tooltip } from '@nextui-org/react';
import { EditIcon } from '../../../../utils/icons';
import { port } from '../../../../../config/env';
import { OrderTable } from '../../../widgets/orderTable';
import { formatCount } from '../../../../utils/formatCount';
import { GoListOrdered } from 'react-icons/go';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import { useAuth } from '../../../auth/core/Auth';
import { Personnel } from './Perssonal';



export const WatchStoreForSeeDetails = () => {

    const { idStore: id } = useParams();
    const {
        data: store,
        errors,
        isLoadingData,
    } = useEjecut({ url: `stores/${id}` });
    const { currentUser } = useAuth()
    const { data } = useEjecut({ url: `orders/summary?idStore=${id}` })

     const DataTabs: Option[] = [
        { option: "Inventory", component: <>{/* <Personnel/> */}</>, icon: <MdOutlineInventory size={22} />, link: '' },
        { option: "Finanzas", component: <></>, icon: <FaMoneyCheckDollar size={22} />, link: '' },
        { option: "Orders", component: <OrderTable idStore={Number(id)} />, icon: <GoListOrdered size={22} />, link: '' }

    ]

    return (
        <>
            <PageTitleInit />
            {errors ? (
                <div className="m-16">
                    <ErrorsItems />
                </div>
            ) : isLoadingData ? (
                <LoadingWatch />
            ) : (
                <div className="flex flex-col items-center justify-content-center w-full">
                    {/* Headers */}
                    <div className='w-full'>
                        <div className='w-1/2 mb-6 inset-0 aspect-[20/19] sm:aspect-[20/20] md:aspect-[15/10] lg:aspect-[40/5] 2xl:aspect-auto'>

                            <div className='w-full  absolute top-24 md:top-0 -z-10'>
                                <div className='w-full  shadow-lg  shadow-rose-950 lg:h-80 bg-gradient-to-t from-transparent via-white to-rose-100 overflow-hidden'>
                                    <Image

                                        className="-z-20 h-56 sm:h-auto object-cover rounded-none"
                                        width={"100%"}
                                        alt="Album Cover"
                                        src={`${port}${store?.imgfondo}`}
                                    />
                                </div>
                                <div className='w-1/2 md:w-1/3 m-auto bg-gradient-to-tl from-rose-800 to-sky-950 z-30  rounded-b-[200px] rounded-t-3xl'>
                                    <div className=' py-6 w-[70%] h-full aspect-square m-auto -mt-20 sm:-mt-32 md:-mt-[80px] lg:-mt-[150px] '>
                                        <Avatar
                                            isBordered
                                            className="w-[85%] m-auto h-full animate-opacityonly"
                                            src={`${port}${store?.imgPortada}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-between items-center  lg:mt-[167px] px-2 lg:px-10 h-20 w-full'>
                            <h1 className='sm:text-2xl font-bold'>Name Store: <span className='text-rose-900'>{store?.name}</span></h1>
                            <div className='flex gap-4'>
                                {
                                    (currentUser?.permission.includes('MANAGE_OWN') || currentUser?.permission.includes('MANAGE_ALL')) &&
                                    <Link to={`/stores/edit/${id}`}>
                                        <Tooltip content="Edit">
                                            <span
                                                className="sm:text-lg text-default-400 cursor-pointer active:opacity-50"
                                            >
                                                <EditIcon />
                                            </span>
                                        </Tooltip>
                                    </Link>
                                }

                            </div>
                        </div>
                    </div>
                    {/* Main */}
                    <div className='sm:mt-24 w-full gap-10 sm:gap-4 flex-col md:flex-row flex justify-around px-5'>
                        {/* Seccion 1 Info Basic */}
                        <div className='w-full overflow-hidden relative bg-white shadow-2xl animate-appearance-in  h-64 md:w-1/2 px-6 py-2 rounded-xl border border-rose-500/40 m-auto
                        flex flex-col gap-4'>
                            {/*   <span className=' absolute inset-0 bg-gradient-to-br from-teal-500/10 z-10 to-purple-800/10 clip-user'></span> */}
                            <h1 className='text-2xl mb-5 '>Info Basic</h1>
                            <div className='flex border-b pb-2 justify-between'>
                                <p className='w-[50%] lg:w-auto text-gray-600'>Address : </p>
                                <span className='text-slate-950 text-end w-[50%] md:w-[60%] line-clamp-3 font-medium'>{store?.address}</span>
                            </div>
                            <div className='flex border-b pb-2 justify-between'>
                                <p className='w-[40%] text-gray-600'>Contact :</p>
                                <span className='text-slate-950 font-medium'>{store?.phone}</span>
                            </div>
                            <div className='flex border-b pb-2 justify-between'>
                                <p className='w-[40%] text-gray-600'>Time :</p>
                                <span className='text-slate-950 font-medium'>{store?.timeInitial} AM - {store?.timeEnd} PM</span>
                            </div>
                        </div>
                        {/* Seccion 2 Metrica */}
                        <div className='w-full relative bg-white h-64 md:w-1/2 m-auto flex shadow-2xl animate-appearance-in flex-col px-6 py-2 rounded-xl border border-rose-500/40 gap-4'>
                            {/* <span className=' absolute inset-0 bg-gradient-to-br from-rose-500/10 z-10 to-purple-800/10 clip-user'></span> */}
                            <h1 className='text-2xl mb-5'>Metricas</h1>
                            <div className='flex border-b pb-2 justify-between'>
                                <p className=' text-gray-600'>Sales :</p>
                                <span className=' text-slate-950 font-medium'>$ {formatCount(data?.amount)}</span>

                            </div>
                            <div className='flex border-b pb-2 justify-between'>
                                <p className='w-[90%] text-gray-600'>Stock :</p>
                                <span className='text-slate-950 font-medium'>450/500</span>

                            </div>
                            <div className='flex border-b pb-2 justify-between'>
                                <p className='w-[90%] text-gray-600'>Orders : </p>
                                <span className='text-slate-950 font-medium'>{data?.all}</span>
                            </div>
                        </div>
                    </div>
                    {/* Pestanas */}
                    <div className='w-full mt-10 min-h-72 flex justify-center items-start'>
                        <TabsNext children={DataTabs} />
                    </div>
                </div>)}
        </>
    )
}


 //  |[Header: Nombre Tienda + ID][botones editar,eliminar]
    //  | Seccion 1: Info Basico     |  Seccion 2: Metricas
    //  -----------------------------------------------------
    //  -direccion : Calle Falsa 123 | -Ventas hoy: $1,200 10%
    //  -Tel: + 34 599 99 99 99      | -Stock : 450/500 productos
    //  -Horario : 9:00 - 21:00 (L-V)| -Pedidos Pendientes: 7
    //  -------------------------------------------------------
    //  [Pestanas : Personal | Inventario | Finanzas | Pedidos]
    //  -------------------------------------------------------
    //  Personal (5)
    //  | nombre    | cargo    | Turno hoy      | |
    //  | Ana Perez | Encargda | 08:00 -16: 00  | |
    //  | ...                                   | |
    //  -----------------------------------------------------
    //  Resenas:
    //  |
    //  |   
    //  |
    //  |
    //  -------------------------------------------------------
    //  Ultima actualizacion : 28/06/2025
    //
    //
    //
