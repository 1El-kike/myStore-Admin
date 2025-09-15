import { Button } from "@nextui-org/react"
import { PageTitleInit } from "../../layout/tollbar/tiltleInit"
import { FiFilter } from "react-icons/fi"
import { MdAddBox } from "react-icons/md"
import { TablesUser } from "../../widgets/table/tableuser"
import { useEjecut } from "../../../hooks/useEjecut"
import { useEffect } from "react"
import { updateTable } from "../../core/filtertableandSearch"


export const UserCreate = () => {

    const {
        setlimit,
        filterValue,
        setdatosTable,
    } = updateTable();

    const linkBackend = `user/?filtervalue=${filterValue}`

    const { data, isLoadingData, errors } = useEjecut({
        url: linkBackend,
    });



    useEffect(() => {
        if (data) {
            setdatosTable(() => data);
            if (data?.data?.totalPages) {
                setlimit(data?.data?.totalPages);
            }
        }
        //return datosTable.unSudcribe()
    }, [data, filterValue]);

    const columns = [
        { name: "NAME", uid: "name" },
        { name: "ROLE", uid: "role" },
        { name: "LAST LOGIN", uid: "login" },
        { name: "JOINED DAY", uid: "steps" },
        { name: "ACTIONS", uid: "actions" },
    ];

    return (

        <>
            <div className="flex items-end w-full justify-between">
                <PageTitleInit />
                <div className="md:mx-4 mx-2 text-sm flex gap-2">
                    <Button size="sm" variant="light" className=" p-0 m-0  text-xs md:px-2  text-teal-700" endContent={<FiFilter />} color="default">FILTER</Button>
                    <Button size="sm" variant="shadow" className=" p-0 m-0  text-xs md:px-2" endContent={<MdAddBox />} color="danger">CREATE</Button>
                </div>
            </div>
            <div className='flex w-full mt-7 px-1 md:px-7'>
                <div className="w-full">
                    <div className="flex justify-between">

                    </div>
                    <TablesUser
                        columns={columns}
                        notId={false}
                    />

                </div>
            </div>
        </>
    )
}
