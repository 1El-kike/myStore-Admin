// src/hooks/useWebSocket.ts
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useAuth } from "../module/auth/core/Auth";

export type DashboardData = {
  totalSales: number;
  recentTransactions: any[];
  moneyFlow: any[];
  income: number;
  expense: number;
  lastTransactions: any[];
  apexChart: {
    del: number;
    can: number;
  };
  card: any[];
  // ... otros tipos según tu API
};

export const useWebSocket = (url: string, time: dayjs.Dayjs | null) => {
  const queryClient = useQueryClient();

  const { currentUser, auth } = useAuth();

  useEffect(() => {
    const socket: Socket = io(url, {
      path: "/socket.io",
      withCredentials: true,
      transports: ["websocket"],
      auth: {
        token: auth?.api_token, // Asegúrate de enviar el token
        user: {
          // También envía los datos del usuario directamente
          id: currentUser?.id,
          role: currentUser?.role,
          permissions: currentUser?.permission, // Permisos reales del usuario
        },
      },
    });

    // 1. Pedir datos iniciales al conectarse
    socket.on("connect", () => {
      socket.emit("get-dashboard-data", time); // Dispara el evento del backend
      queryClient.setQueryData(["socket-status"], "connected");
    });

    // 2. Recibir datos iniciales
    socket.on("dashboard-data", (data: DashboardData) => {
      //  console.log(data);
      queryClient.setQueryData(["moneyinfflow"], {
        income: data.income,
        expense: data.expense,
      });
      queryClient.setQueryData(["card"], data.card);

      queryClient.setQueryData(["apexChart"], data.apexChart);
      queryClient.setQueryData(["transactions"], data.lastTransactions);
    });

    // 3. Recibir actualizaciones en tiempo real
    socket.on("dashboard-update", (newData: DashboardData) => {
      queryClient.setQueryData(["dashboard"], (old: DashboardData) => ({
        ...(old || {}),
        ...newData,
      }));
    });

    // 4. Suscribirse a actualizaciones
    socket.emit("subscribe-dashboard");

    // Manejar errores
    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
      queryClient.setQueryData(["socket-status"], "disconnected");
    });

    // Limpieza al desmontar
    return () => {
      socket.disconnect();
      queryClient.setQueryData(["socket-status"], "disconnected");
    };
  }, [url, queryClient]);
};
