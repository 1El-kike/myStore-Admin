import { useEffect } from "react";
import { useEjecut } from "../../../../hooks/useEjecut";
import { updateTable } from "../../../core/filtertableandSearch";
import { Table } from "../../../widgets/GroupBy";

export const Personnel = () => {
    const columns = [
        { name: "NAME", uid: "name" },
        { name: "CARGO", uid: "methodPayment" },
        { name: "TURNO TODAY", uid: "customer" },
        { name: "STATUS", uid: "status" },
        { name: "", uid: "actions" },
    ];

    const { setdatosTable } = updateTable();
    const { data: d, isLoadingData, errors } = useEjecut({ url: "stores" });



    useEffect(() => {
        if (d) {
            setdatosTable(d);

        }
        //return datosTable.unSudcribe()
    }, [d]);
    return (
        <div>
            <Table notID={true} columns={columns} notItem={true} isDetails={false} />
        </div>
    )
}