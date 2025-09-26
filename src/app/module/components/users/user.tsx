import { Button } from "@nextui-org/react"
import { FilterProvider } from "../../../hooks/useFillterUser"
import { PageTitleInit } from "../../layout/tollbar/tiltleInit"
import { UserCreate } from "./userCreate"
import { FiFilter } from "react-icons/fi"
import { MdAddBox } from "react-icons/md"



export const User = () => {

    return (

        <>
            <div className="flex items-end w-full justify-between">
                <PageTitleInit />
                <div className="md:mx-4 mx-2 text-sm flex gap-2">
                    <Button size="sm" variant="light" className=" p-0 m-0  text-xs md:px-2  text-teal-700" endContent={<FiFilter />} color="default">FILTER</Button>
                    <Button size="sm" variant="shadow" className=" p-0 m-0  text-xs md:px-2" endContent={<MdAddBox />} color="danger">CREATE</Button>
                </div>
            </div>
            <FilterProvider>
                <UserCreate />
            </FilterProvider>
        </>
    )
}
