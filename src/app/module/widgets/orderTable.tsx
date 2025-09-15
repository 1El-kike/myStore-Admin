
import { Table } from "./GroupBy";
import { FaReplyAll } from "react-icons/fa";
import { Option } from "../../../interface/TypeTabs";
import { MdNoiseAware, MdOutlineIncompleteCircle, MdOutlinePendingActions } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { TabsNext } from "./tabs";
import { ErrorsItems } from "../errors/errorsItems";
import useOrder from "../../hooks/useOrder";

interface TypeOrderTable {
    idStore: number | null
}

export const OrderTable: React.FC<TypeOrderTable> = ({ idStore = null }) => {

    const { data, isLoadingData, errors, onLinkChange } = useOrder({ idStore: idStore ? Number(idStore) : null })

    const columns = [
        { name: "ORDER", uid: "order" },
        { name: "PAYMENT METHOD", uid: "methodPayment" },
        { name: "CUSTOMER", uid: "customer" },
        { name: "STATUS", uid: "status" },
        { name: "", uid: "actions" },
    ];

    if (errors) {
        return (
            <ErrorsItems />
        );
    }

    if (isLoadingData || !data) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                Loading...
            </div>
        ); // Mostrar un mensaje de carga mientras no haya data
    }



    const Datacomponent: Option[] = [
        {
            option: "All",
            component: <Table notID={true} columns={columns} notItem={true} isDetails={true} />,
            icon: <FaReplyAll size={22} />,
            badge: { color: "primary", contex: data?.countsByStatus.AllCount | 0 },
            link: "all",
        },

        {
            option: "Pending",
            component: <Table notID={true} columns={columns} notItem={true} isDetails={true} />,
            icon: <MdOutlinePendingActions size={22} />,
            badge: {
                color: "warning",
                contex: data?.countsByStatus?.pendingCount | 0,
            },
            link: "pending",
        },
        {
            option: "Accepted",
            component: <Table notID={true} columns={columns} notItem={true} isDetails={true} />,
            icon: <MdOutlineIncompleteCircle size={22} />,
            badge: {
                color: "secondary",
                contex: data?.countsByStatus?.acceptedCount | 0,
            },
            link: "accepted",
        },

        {
            option: "Delivering",
            component: <Table notID={true} columns={columns} notItem={true} isDetails={true} />,
            icon: <MdNoiseAware size={22} />,
            badge: {
                color: "default",
                contex: data?.countsByStatus?.deliveringCount | 0,
            },
            link: "delivering",
        },
        {
            option: "Delivered",
            component: <Table notID={true} columns={columns} notItem={true} isDetails={true} />,
            icon: <MdNoiseAware size={22} />,
            badge: {
                color: "success",
                contex: data?.countsByStatus?.deliveredCount | 0,
            },
            link: "delivered",
        },
        {
            option: "Cancelled",
            component: <Table notID={true} columns={columns} notItem={true} isDetails={true} />,
            icon: <ImCancelCircle size={22} />,
            badge: {
                color: "danger",
                contex: data?.countsByStatus?.cancelledCount | 0,
            },
            link: "cancelled",
        },
    ];



    return (
        <>
            <div className="m-1 md:m-5 bg-gradient-to-tr from-violet-200 to-rose-100 rounded-3xl ">
                <TabsNext
                    onLinkChange={onLinkChange}
                    variant="underlined"
                    children={Datacomponent}
                />
            </div>

        </>

    );
};

