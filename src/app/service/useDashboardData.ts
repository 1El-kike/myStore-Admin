import { useQuery } from "@tanstack/react-query";

export const useDashboardData = (url: string) => {
  return useQuery<any>({
    queryKey: [url],
    staleTime: 5 * 60 * 1000, // 5 minutos
    queryFn: () => [],
    refetchOnWindowFocus: false,
  });
};
