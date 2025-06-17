import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { port } from "../../config/env";

// Mantener la misma estructura que WebSockets
export type LocationData = {
  lat: number;
  lng: number;
};

// Tipo para la respuesta de la ruta completa
type RouteResponse = [number, number][];

const getRoute = async (orderId: string): Promise<RouteResponse> => {
  try {
    const response = await axios.get<LocationData[]>(
      `${port}location/${orderId}`
    );
    // Convertir a formato de ruta [lat, lng][]
    return response.data.map((loc) => [loc.lat, loc.lng]);
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
): UseQueryResult<RouteResponse, Error> => {
  return useQuery<RouteResponse, Error>({
    queryKey: ["order-route", orderId],
    queryFn: () => getRoute(orderId),
    staleTime: 5 * 60 * 1000,
    enabled: !!orderId,
    retry: 2,
  });
};
