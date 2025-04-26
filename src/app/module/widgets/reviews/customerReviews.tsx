import React, { useState, useCallback, useRef, useEffect } from "react";
import { useEjecut } from "../../../hooks/useEjecut";
import { Avatar, Spinner } from "@nextui-org/react";
import { StarRating } from "../startRating";
import { GoVerified } from "react-icons/go";
import { HiOutlineHandThumbDown, HiOutlineHandThumbUp } from "react-icons/hi2";
import { MessageReviewLoading } from "../loading/LoadingReview";

// Componente memoizado para evitar rerenders innecesarios
const ReviewItem = React.memo(({ item }: { item: any }) => {
  const formatDate = useCallback((dateString: string | Date) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between w-[90%] m-5">
      <div className="flex w-full mb-3 md:mb-0 md:flex-col gap-5 md:gap-1 items-center md:w-[20%]">
        <Avatar
          isBordered
          className="w-14 h-14"
          src="https://i.pravatar.cc/150?u=a04258114e29026708c"
        />
        <div>
          <p>{item?.user?.name}</p>
          <p className="text-sm text-gray-500">{formatDate(item.createdAt)}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 pl-3 w-[95%] md:w-[70%]">
        <StarRating rating={item.rating} size={20} />
        <div className="flex text-sm items-center gap-1 text-green-400">
          <GoVerified />
          <p>Verified purchase</p>
        </div>
        <p>{item?.comment}</p>
        <div className="flex mt-2 gap-2">
          <div className="flex items-center gap-2 cursor-pointer">
            <HiOutlineHandThumbUp />
            <p className="text-sm">{item?.likes}</p>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <HiOutlineHandThumbDown />
            <p className="text-sm">{item?.notlikes || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export const CustomerReviews = ({ productId,refreshFlag }: { productId: string ,refreshFlag:number}) => {
  const [page, setPage] = useState(1);
  const [mergedData, setMergedData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const { data: reviewData, isLoadingData } = useEjecut({
    url: `review/product/${productId}?page=${page}&limit=10`,
  });

  useEffect(() => {
    // Resetear datos y paginación
    setMergedData([]);
    setPage(1);
    setHasMore(true);
  }, [refreshFlag]); // Se ejecuta cuando refreshFlag cambia

  // Efecto para acumular datos y verificar paginación
  useEffect(() => {
    if (reviewData) {
      if (reviewData.length === 0) {
        setHasMore(false);
      } else {
        setMergedData((prev) => [...prev, ...reviewData]);
      }
    }
  }, [reviewData]);

  // Efecto para el observer de scroll infinito
  useEffect(() => {
    if (isLoadingData || !hasMore) return;

    const options = {
      root: null,
      rootMargin: "200px",
      threshold: 0.1,
    };

    observer.current = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    }, options);

    if (loaderRef.current) {
      observer.current.observe(loaderRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isLoadingData, hasMore]);

  return (
    <div className="flex flex-col mt-5 items-center w-full">
      {mergedData.map((item, index) => (
        <ReviewItem key={`${item.id}-${index}`} item={item} />
      ))}

      <div ref={loaderRef} className=" flex w-full items-center justify-center">
        {hasMore && isLoadingData && (
          <div className="flex w-full ml-10 flex-col gap-5">
            <MessageReviewLoading />
            <MessageReviewLoading />
            <MessageReviewLoading />
          </div>
        )}
        {!hasMore && mergedData.length > 0 && (
          <p className="text-gray-500">No hay más reseñas para mostrar</p>
        )}
      </div>

      {!hasMore && mergedData.length === 0 && (
        <p className="text-gray-500">Este producto no tiene reseñas aún</p>
      )}
    </div>
  );
};
