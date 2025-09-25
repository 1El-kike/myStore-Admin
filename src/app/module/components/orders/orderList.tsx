import React from "react";
import { PageTitleInit } from "../../layout/tollbar/tiltleInit";
import { TotalList } from "./totalList";
import { NotItems } from "../../widgets/datosvacios/NotItems";
import { FcPaid } from "react-icons/fc";
import { OrderTable } from "../../widgets/orderTable";
import { useEjecut } from "../../../hooks/useEjecut";


export const OrderList = () => {


  const { data, isLoadingData, errors } = useEjecut({ url: 'orders/summary' })

  return (
    <>
      <PageTitleInit />
      <div className=" w-[98%] md:w-[95%] filter contrast-150 m-1 md:m-5">
        <TotalList
          active={
            data?.pending +
            data?.accepted +
            data?.delivering
          }
          complet={data?.delivered}
          total={data?.all}
          canceled={data?.cancelled}
        />
      </div>
      {errors &&
        <div>
          Error..
        </div>
      }
      {
        isLoadingData ?
          <div>
            loadding...
          </div>
          :
          data?.all == 0 ?
            <div className="mt-10 lg:mx-10 mx-2">
              <NotItems
                link={`/orders/create/`}
                role={["EMPLOYEE", "ADMIN"]}
                Icon={FcPaid}
                next="In next link you would can create one"
                text={"There are not orders that show. before of continue you should add orders in you Count."}
              />
            </div>
            :
            <>

              <OrderTable idStore={null} />
            </>
      }

    </>
  );
};
