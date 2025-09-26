import { TablesUser } from "../../widgets/table/tableuser"
import { useEjecut } from "../../../hooks/useEjecut"
import { useEffect } from "react"
import { updateTable } from "../../core/filtertableandSearch"
import { useFilter } from "../../../hooks/useFillterUser"



export const UserCreate = () => {

    const {
        setlimit,
        filterValueUser,
        setdatosTable,
        page,
        rowsPerPage,
    } = updateTable();


    const { role, store } = useFilter()


    // 1. Crear el contexto
    const linkBackend = `user/?filterValueUser=${filterValueUser}&page=${page}&pageSize=${rowsPerPage}&role=${role}&store=${store}`

    const { data, isLoadingData, errors } = useEjecut({
        url: linkBackend,
    });

    useEffect(() => {
        if (data) {
            setdatosTable(() => data.res);
            if (data?.totalPages) {
                setlimit(data?.totalPages);
            }
        }
        //return datosTable.unSudcribe()
    }, [data, filterValueUser]);

    const columns = [
        { name: "NAME", uid: "name" },
        { name: "ROLE", uid: "role" },
        { name: "LAST LOGIN", uid: "login" },
        { name: "JOINED DAY", uid: "steps" },
        { name: "ACTIONS", uid: "actions" },
    ];

    return (

        <>
            <div className='flex w-full mt-7 px-1 md:px-7'>
                <div className="w-full">

                    <TablesUser
                        columns={columns}
                        notId={false}
                    />

                </div>
            </div>
        </>
    )
}
