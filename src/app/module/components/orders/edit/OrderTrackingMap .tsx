import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Polyline } from "react-leaflet";
import L, { LatLngBounds, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { io, Socket } from "socket.io-client";
import { port } from "../../../../../config/env";
import polyline from "@mapbox/polyline";
import { useWebSocketOrder } from "../../../../service/useWebSocketLocationOrder";
import { useRouteData } from "../../../../service/useLocation";
import Route from "../../../widgets/routerPolyline";


export const OrderTrackingMap = ({ orderId }: { orderId: string }) => {

    useWebSocketOrder(
        window.location.hostname === "localhost"
            ? `ws://localhost:3450`
            : `${port}`,
        orderId
    );

    const { data: position = [[0, 0], [0, 0]], isLoading, isError } = useRouteData(orderId);
    console.log(position[0])
    //const { data: locations, isLoading: L, isError: E } = useLocationData('socket-status-Location', orderId);

    const AutoFitBounds = ({ positions }: any) => {
        const map = useMap();

        useEffect(() => {
            if (positions.length === 0) return;

            // Calcular los límites que contienen todas las coordenadas
            const bounds = new LatLngBounds(positions);
            map.fitBounds(bounds, {
                padding: [50, 50], // Espacio adicional (en píxeles)
                animate: true, // Animación suave
            });

        }, [positions, map]);

        return null;
    };

    return (
        <div className="h-96 w-full relative">
            <MapContainer
                center={[0, 0]}
                zoom={13}
                className="h-full w-full rounded-lg"
            >
                <TileLayer
                    /* url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors' */
                    //url={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=YOUR_MAPTILER_KEY`}
                    //attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'

                />


                {/* Usa el componente Route en lugar de Polyline */}
                <Route start={position[0]} end={position[1]} />

                {position?.map((loc: any, index: number) => (
                    <Marker key={index} position={loc} />
                ))}

                <AutoFitBounds positions={position.length > 0 ? position : [[0, 0], [0, 0]]} />
                {/*   <MapUpdater position={position} /> */}
            </MapContainer>
        </div>
    );
};