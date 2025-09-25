import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { updateTable } from '../module/core/filtertableandSearch';
import { useEjecut } from './useEjecut';
import { useAuth } from '../module/auth/core/Auth';
import { ViewDetailOrder } from '../module/components/orders/detailorders';


interface TypeData {
    orders: any[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}
interface TypeOrder {
    sumary: {
        all: number;
        amount: number | string;
        accepted: number;
        cancelled: number;
        pending: number;
        delivered: number;
        delivering: number;
    };
    countsByStatus: {
        AllCount: number;
        pendingCount: number;
        acceptedCount: number;
        deliveringCount: number;
        deliveredCount: number;
        cancelledCount: number;
    };
    data: {
        all: TypeData;
        delivered: TypeData;
        delivering: TypeData;
        accepted: TypeData;
        pending: TypeData;
        cancelled: TypeData;
    };
}

interface TypeProp {
    idStore: number | null
}

const useOrder = (idStore: TypeProp = { idStore: null }) => {

    const navigate = useNavigate();


    const [link, setlink] = useState("all");

    const {
        page,
        filterTimeStart,
        filterTimeEnd,
        rowsPerPage,
        setlimit,
        filterValue,
        setdatosTable,
    } = updateTable();

    const linkBackend = `orders/?include=${link}&page=${page}&pageSize=${rowsPerPage}&filtertimeStart=${filterTimeStart}&filtertimeEnd=${filterTimeEnd}&filtervalue=${filterValue}&idStore=${idStore.idStore}`

    const { data, isLoadingData, errors } = useEjecut({
        url: linkBackend,
    });

    const onLinkChange = (link: string) => {
        setlink(link);
    };

    useEffect(() => {
        if (data) {
            setdatosTable(() => functionactions(data?.data[link].orders));
            if (data?.data[link]?.totalPages) {
                setlimit(data?.data[link]?.totalPages);
            }
        }
        //return datosTable.unSudcribe()
    }, [data, filterValue]);

    const { currentUser } = useAuth();

    const actions = (order: any) => {
        const editOrder = () => {
            navigate(`edit/${id}`);
        };
        const { id } = order;

        let result = {}

        if (currentUser?.permission.includes('READ_OWN')) {
            result = {
                urledit: {
                    typeactions: "navigate",
                    element: "/orders/list/edit/" + id,
                },
                ...(currentUser?.permission.includes('MANAGE_OWN') && { urldelite: "delite/" }),
                urlview: {
                    typeactions: "modal",
                    ...(order && { element: <ViewDetailOrder order={order} /> }),
                    title: order.order.productName,
                },
            };
        } else {
            result = {
                urlview: {
                    typeactions: "modal",
                    ...(order && { element: <ViewDetailOrder order={order} /> }),
                    title: order.order.productName,
                },
            }
        }

        return result
    };

    const functionactions = (data: any[]) => {
        const newData = data?.map((prev: any) => ({
            ...prev,
            actions: actions(prev),
        }));
        return newData;
    };


    return {
        data,
        isLoadingData,
        errors,
        onLinkChange
    }
}

export default useOrder;
