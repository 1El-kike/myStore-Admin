import { Button } from "@nextui-org/react";
import { StarRating } from "../startRating";
import ProgressReviews from "./progressReviews";
import { FaPencilAlt } from "react-icons/fa";
import { CustomerReviews } from "./customerReviews";
import { useEjecut } from "../../../hooks/useEjecut";

export const Reviews = ({ productId  }: { productId: any }) =>{

     const {
        data: reviewData,
        errors,
        isLoadingData,
      } = useEjecut({ url: `review/stats/${productId}` });

return (
    <div className="flex w-full flex-col ">
      <div className="flex pl-3 scale-90 items-center">
        <div className="grow basis-56 border-r">
          {/* cantidad de rating verdadera */}
          <div className="flex flex-col  items-center justify-center gap-3">
            <p className="text-xl font-bold">Average rating</p>
            <h1 className="text-7xl bg-gradient-to-tr from-slate-800 bg-clip-text text-transparent to-rose-900 font-extrabold">{`${4}/5`}</h1>
            <StarRating rating={4} size={22} />
            <p className="text-slate-400">{`(9.12k reviews)`}</p>
          </div>
        </div>
        <div className="grow basis-56 border-r">
          <ProgressReviews errors={errors} isLoadingData={isLoadingData} reviewData={reviewData} />
        </div>
        <div className="grow flex justify-center items-center basis-56 ">
          <Button
            startContent={<FaPencilAlt />}
            className="text-base font-semibold"
            color="default"
            variant="light"
          >
            Write your review
          </Button>
        </div>
      </div>
      <div className="flex border-t-1 w-full">
        <CustomerReviews productId={productId}/>
      </div>
    </div>
  );
} 