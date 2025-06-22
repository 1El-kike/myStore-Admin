import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { port } from "../../config/env";

// Mantener la misma estructura que WebSockets

export type IRootObjectItem = {
  storeOrderId: number;
  store: IStore;
  destination: IDestination;
  currentLocation: number[];
  status: string;
};
export type IStore = {
  id: number;
  name: string;
  coordinates: number[];
};
export type IDestination = {
  coordinates: number[];
};

export type LocationData = {
  lat: number;
  lng: number;
};

const getRoute = async (storeOrderId: string): Promise<IRootObjectItem> => {
  try {
    const response: any = await axios.get<LocationData[]>(
      `${port}location/${storeOrderId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? error.response?.data?.message || "Error al obtener ruta"
        : "Error desconocido"
    );
  }
};

export const useRouteData = (
  orderId: string
): UseQueryResult<IRootObjectItem, Error> => {
  return useQuery<IRootObjectItem, Error>({
    queryKey: ["order-route", orderId],
    queryFn: () => getRoute(orderId),
    staleTime: 5 * 60 * 1000,
    enabled: !!orderId,
    retry: 2,
  });
};
