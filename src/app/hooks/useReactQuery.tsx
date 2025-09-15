import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../service/fetchData";


interface TypeQuery {
  key: any;
}



export const useDataQuery = ({ key }: TypeQuery) => {

  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<any>(
    {
      queryKey: [key],
      ...(fetchData as any),
      getNextPageParam: (lastPage: any) => lastPage.nextCursor
    })
  return {
    isLoading,
    isError,
    data: data?.pages.flatMap((page: any) => page.datos) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage,
  };


};


export const useQuery = (url: string) => {


}
