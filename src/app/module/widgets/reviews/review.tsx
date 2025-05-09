import { Button } from "@nextui-org/react";
import { StarRating } from "../startRating";
import ProgressReviews from "./progressReviews";
import { FaPencilAlt, FaStar } from "react-icons/fa";
import { CustomerReviews } from "./customerReviews";
import { useEjecut } from "../../../hooks/useEjecut";
import { ErrorsItems } from "../../errors/errorsItems";
import { Modal_Component } from "../modal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { port } from "../../../../config/env";
import { useAuth } from "../../auth/core/Auth";
import axios from "axios";
import { ModalCreateReview } from "./ModalCreateReview";
import { Toast } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";
import { LoadingReview } from "../loading/LoadingReview";

export const Reviews = ({ productId }: { productId: any }) => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [valuetextReview, setvaluetextReview] = useState("");
  const { currentUser } = useAuth();
  const [errorReview, seterror] = useState("");
 // const [first, setfirst] = useState(false)

  const {
    data: reviewData,
    errors,
    isLoadingData,
  } = useEjecut({
    url: `review/stats/${productId}`,
  });

  useEffect(() => {
    let timeoutId: any;
    if (errorReview) {
      seterror(errorReview);
      // Cierra automáticamente después de 5 segundos
      timeoutId = setTimeout(() => {
        seterror("");
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [errorReview, seterror]);

  const discard = () => {
    setvaluetextReview("");
    setSelectedStars(0);
  };

  const createReviews = async (closeModal: () => void) => {
    if (selectedStars == 0) {
      seterror("You have select a rating");
      return;
    }
    if (valuetextReview == "") {
      seterror("You do not have comment nothing");
      return;
    }

    const data = {
      rating: selectedStars,
      productId,
      userId: currentUser ? currentUser.id : null,
      comment: valuetextReview,
    };

    try {
      // ...validaciones
      // ✅ Agrega await para esperar la creación
      await axios.post(`${port}review/`, data); 
      setRefreshFlag(prev => prev + 1);
      closeModal();
      seterror("");
      setvaluetextReview("");
      setSelectedStars(0);
     // setfirst(true)
    } catch (error) {
      seterror("Error creating review");
    }
  };

  const average = useMemo(() => {
    if (!reviewData) return 0;

    const { totalSum, totalCount } = reviewData.reduce(
      (acc: any, { star, count }: { star: number; count: number }) => ({
        totalSum: acc.totalSum + star * count,
        totalCount: acc.totalCount + count,
      }),
      { totalSum: 0, totalCount: 0 }
    );
    return totalCount > 0 ? ((totalSum / totalCount) * 100) / 100 : 0;
  }, [reviewData]);

  const totalReviews =
    reviewData?.reduce((acc: any, curr: any) => acc + curr.count, 0) || 0;

  const formatLikes = useCallback((likes: number): string => {
    if (likes >= 1000) {
      return `${(likes / 1000).toFixed(1)}k`;
    }
    return likes.toString();
  }, []);

  return (
    <div className="flex w-full flex-col ">
      {errors ? (
        <ErrorsItems />
      ) : isLoadingData ? (
        <LoadingReview />
      ) : (
        reviewData && (
          <div>
            <div className="flex  flex-col md:flex-row md:pl-3 scale-90 items-center">
              <div className="grow  w-full md:basis-56 border-r">
                {/* cantidad de rating verdadera */}
                <div className="flex flex-col  items-center justify-center md:gap-3">
                  <p className=" md:text-xl font-bold">Average rating</p>
                  <h1 className=" text-4xl md:text-7xl bg-gradient-to-tr from-slate-800 bg-clip-text text-transparent to-rose-900 font-extrabold">{`${
                    Math.round(average * 10) / 10
                  }/5`}</h1>
                  <StarRating rating={average} size={22} />
                  <p className="text-slate-400">{`( ${formatLikes(
                    totalReviews
                  )} reviews )`}</p>
                </div>
              </div>
              <div className="grow  w-full md:basis-56 border-r">
                <ProgressReviews reviewData={reviewData} />
              </div>
              <div className="grow flex justify-center items-center basis-56 ">
                <Modal_Component
                  component={
                    <ModalCreateReview
                      selectedStars={selectedStars}
                      setSelectedStars={setSelectedStars}
                      setvaluetextReview={setvaluetextReview}
                      valuetextReview={valuetextReview}
                    />
                  }
                  onDiscardChange={discard}
                  isAlert="yes"
                  title={"Add Review"}
                  size="2xl"
                  onClick={() => {}}
                  onActionChange={(closeModal) => createReviews(closeModal)}
                  className=""

                  //  onDiscardChange={onDiscardChange}
                >
                  <Button
                    startContent={<FaPencilAlt />}
                    className="text-base font-semibold"
                    color="default"
                    variant="light"
                    onPress={(e: any) => e.preventDefault()}
                  >
                    Write your review
                  </Button>
                </Modal_Component>
              </div>
            </div>
            <div className="flex border-t-1 w-full">
           
                <CustomerReviews
                  productId={productId}
                  refreshFlag={refreshFlag}
                />
            </div>
          </div>
        )
      )}
      {errorReview && (
        <Toast
          className="animate-appearance-in absolute"
          key={`$${Date.now() + errorReview}`}
        >
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{errorReview}</div>
          <Toast.Toggle />
        </Toast>
      )}
    </div>
  );
};
