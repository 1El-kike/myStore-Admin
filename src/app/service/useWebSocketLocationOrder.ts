// src/hooks/useWebSocket.ts
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { LatLngExpression } from "leaflet";

export type LocationData = {
  lat: number;
  lng: number;
};

export const useWebSocketOrder = (url: string, orderId: any) => {
  const queryClient = useQueryClient();
  /* const [position, setPosition] = useState<L.LatLngTuple>([23.133, -82.38304]);
  const [route, setRoute] = useState<LatLngExpression[]>([]);
  const [locations, setLocations] = useState<L.LatLngTuple[]>([]); */

  useEffect(() => {
    if (!orderId) return;

    const socket: Socket = io(url, {
      path: "/socket.io",
      query: { orderId },
      withCredentials: true,
      transports: ["websocket"],
    });

    // 1. Pedir datos iniciales al conectarse
    socket.on("connect", () => {
      socket.emit("subscribe-order", orderId); // Dispara el evento del backend
      queryClient.setQueryData(["socket-status", orderId], "connected");
    });

    // 2. Recibir datos iniciales
    socket.on("route-update", (newRoute: LatLngExpression[]) => {
      console.log(newRoute);
      //   setRoute(newRoute);
      queryClient.setQueryData(["order-route", orderId], newRoute);
    });
    /*   socket.on("route-update", (route: [number, number][]) => {
      console.log(route);
      queryClient.setQueryData(["order-route", orderId], route);
    }); */

    // 3. Recibir actualizaciones en tiempo real
    socket.on("location-update", (newLocation: LocationData) => {
      // setPosition([newLocation.lat, newLocation.lng]);
      queryClient.setQueryData(["current-location", orderId], newLocation);
      // Actualizar historial de ubicaciones
      queryClient.setQueryData<LocationData[]>(
        ["location-history", orderId],
        (old: any) => [...(old || []), newLocation]
      );
      //setLocations((prev) => [...prev, [newLocation.lat, newLocation.lng]]);
      /* queryClient.setQueryData(["newLocation"], (old: LocationData) => ({
        ...(old || {}),
        ...newLocation,
      })); */
    });

    socket.on("order-tracking-error", (error) => {
      console.error("WebSocket error:", error);
      queryClient.setQueryData(
        ["socket-error", orderId],
        error.message || "Error de seguimiento"
      );
    });

    // Limpieza al desmontar
    return () => {
      socket.disconnect();
      queryClient.setQueryData(["socket-status", orderId], "disconnected");
    };
  }, [url, queryClient, orderId]);
};
