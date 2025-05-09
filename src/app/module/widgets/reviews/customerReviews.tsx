import React, { useState, useCallback, useRef, useEffect } from "react";
import { useEjecut } from "../../../hooks/useEjecut";
import { Avatar } from "@nextui-org/react";
import { StarRating } from "../startRating";
import { GoVerified } from "react-icons/go";
import {
  HiHandThumbDown,
  HiHandThumbUp,
  HiOutlineHandThumbDown,
  HiOutlineHandThumbUp,
} from "react-icons/hi2";
import { MessageReviewLoading } from "../loading/LoadingReview";
import axios from "axios";
import { port } from "../../../../config/env";
import { useAuth } from "../../auth/core/Auth";

export const CustomerReviews = ({
  productId,
  refreshFlag,
}: {
  productId: string;
  refreshFlag: number;
}) => {
  const [page, setPage] = useState(1);
  const [mergedData, setMergedData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const isFetching = useRef(false);
  const isInitialLoad = useRef(true);
  const { currentUser } = useAuth();
  let usuarioId = currentUser?.id;

  
  const { data: reviewData, isLoadingData } = useEjecut({
    url: `review/product/${productId}?page=${page}&limit=10&refresh=${refreshFlag}`,
  });
  const { data: like, isLoadingData:loading,errors:error } = useEjecut({
    url: `reviewLike/like/${usuarioId}`,
  });


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

  const sendlikeorNot = async (reviewId: number, type: "like" | "dontLike") => {
    switch (type) {
      case "like":
        try {
          await axios.post(port + `reviewLike/like/`, {
            usuarioId,
            reviewId,
            type,
          });
        } catch (error) {
          console.log(error);
        }
        break;
      case "dontLike":
        try {
          await axios.post(port + `reviewLike/like/`, {
            usuarioId,
            reviewId,
            type,
          });
        } catch (error) {
          console.log(error);
        }
        break;
    }
    window.location.reload()
  };

  const conditionlike = like?.some( (e:any)=> e?.reviewId == item.id && e.likeorNot === 'like')
  const conditionDontLike = like?.some( (e:any)=> e?.reviewId == item.id && e.likeorNot === 'dontLike')


  return (
    <div className="flex flex-col md:flex-row justify-between w-[90%] m-5">
      <div className="flex w-full mb-3 md:mb-0 md:flex-col gap-5 md:gap-1 items-center  md:w-[20%]">
        <Avatar
          isBordered
          className="w-14 h-14"
          src="https://i.pravatar.cc/150?u=a04258114e29026708c"
        />
        <div className="text-center">
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
          <div
            onClick={() => sendlikeorNot(item.id, "like")}
            className="flex items-center gap-2 cursor-pointer"
          >
            {conditionlike ? (
              <HiHandThumbUp className="text-red-500" />
            ) : (
              <HiOutlineHandThumbUp />
            )}
            <p className="text-sm">{item?.likes}</p>
          </div>
          <div
            onClick={() => sendlikeorNot(item.id, "dontLike")}
            className="flex items-center gap-2 cursor-pointer"
          >
            {
              conditionDontLike ?
              <HiHandThumbDown className="text-slate-900 b" />
              :
            <HiOutlineHandThumbDown />
            }
            <p className="text-sm">{item?.dontlikes || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
});
  
  // Efecto para resetear TODO al agregar nueva reseña
  useEffect(() => {
    /* if (!isInitialMount.current) {  */ // <- Evitar ejecución en el primer render
    setMergedData([]);
    setPage(1);
    setHasMore(true);
    isFetching.current = false;
    isInitialLoad.current = true;
    // Desconectar observer existente
    if (observer.current) {
      observer.current.disconnect();
    }
    /* } */
  }, [refreshFlag]);

  // Efecto para acumular datos y verificar paginación
  useEffect(() => {
    if (reviewData) {
      setHasMore(reviewData.length > 0);
      // Reemplazar datos en lugar de acumular cuando es una actualización
      setMergedData((prev) =>
        page === 1 ? [...reviewData] : [...prev, ...reviewData]
      );
      isFetching.current = false;
      // Después de la carga inicial, permitir nuevas peticiones
      if (isInitialLoad.current) {
        isInitialLoad.current = false;
      }
    }
  }, [reviewData]);

  useEffect(() => {
    const currentLoader = loaderRef.current;
    if (!currentLoader || isLoadingData || !hasMore || isInitialLoad.current)
      return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && !isFetching.current) {
        isFetching.current = true;
        console.log("entro");
        setPage((prev) => prev + 1);
      }
    };

    const newObserver = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "200px",
      threshold: 0.1,
    });

    // Reconectar observer solo si no está observando
    if (!observer.current?.takeRecords().length) {
      observer.current = newObserver;
      newObserver.observe(currentLoader);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [mergedData.length, isLoadingData, hasMore, isInitialLoad.current,]);

  return (
    <div className="flex flex-col mt-5 items-center w-full">
      {mergedData.map((item, index) => (
        <ReviewItem key={`${item.id}-${index}`} item={item}  />
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
          <div className="w-full flex justify-center items-center h-56">
            <p className="text-gray-500">No hay más reseñas para mostrar</p>
          </div>
        )}
      </div>

      {!hasMore && mergedData.length === 0 && (
        <div className="w-full flex justify-center items-center h-56">
          <p className="text-gray-500">Este producto no tiene reseñas aún</p>
        </div>
      )}
    </div>
  );
};
