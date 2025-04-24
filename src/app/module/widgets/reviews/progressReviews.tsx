import React, { useMemo, useCallback } from 'react';
import { Progress } from '@nextui-org/react';
import { useEjecut } from '../../../hooks/useEjecut';
import { ErrorsItems } from '../../errors/errorsItems';

interface ReviewStats {
  star: number;
  count: number;
  totalLikes: number;
}

const ProgressReviews = ({ reviewData,isLoadingData, errors}: { reviewData: any,isLoadingData:boolean | undefined,errors:any }) => {
 

  const processedStats = useMemo(() => {
    // Crear array base para 5-1 estrellas
    const defaultStars = [5, 4, 3, 2, 1];
    
    // Calcular total de reviews
    const totalReviews = reviewData?.reduce((acc:any, curr:any) => acc + curr.count, 0) || 0;


    
    return defaultStars.map(star => {
        const stat = reviewData?.find((s:any) => s.star === star);

        return {
            star,
            count: stat?.count || 0,
            percentage:totalReviews > 0 
            ? ((stat?.count || 0) / totalReviews) * 100 
            : 0,
            totalLikes: stat?.count || 0
        };
    });
}, [reviewData]);

  const formatLikes = useCallback((likes: number): string => {
    if (likes >= 1000) {
      return `${(likes / 1000).toFixed(1)}k`;
    }
    return likes.toString();
  }, []);

  if (isLoadingData) {
    return <div>Cargando estadísticas...</div>;
  }

  if (errors) {
    return <ErrorsItems/>;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 m-5">
      {processedStats.map((item) => (
        <div key={item.star} className="flex w-full gap-4 items-center">
          <p className="grow font-semibold w-16">{item.star} Star</p>
          <Progress 
            aria-label={`${item.percentage}%`}
            size="sm"
            color="default"
            className="max-w-md"
            value={item.percentage}
          />
          <p className="w-16 -space-x-10 text-gray-600">{formatLikes(item.totalLikes)}</p>
        </div>
      ))}
    </div>
  );
};

export default React.memo(ProgressReviews);