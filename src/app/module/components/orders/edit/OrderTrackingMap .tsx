import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Polyline } from "react-leaflet";
import L, { LatLngBounds, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { port } from "../../../../../config/env";
import Route from "../../../widgets/routerPolyline";
import { useWebSocketOrder } from "../../../../service/useWebSocketLocationOrder";
import { useRouteData } from "../../../../service/useLocation";
import { useEjecut } from "../../../../hooks/useEjecut";

// Configuración de íconos
const storeIcon = L.icon({
    iconUrl: '/icons8-casa-96.png',
    iconSize: [60, 60],
    iconAnchor: [15, 30],
    popupAnchor: [0, -300]
});

const destinationIcon = L.icon({
    iconUrl: '/product.png',
    iconSize: [50, 50],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
});

const currentLocationIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149060.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
});

const AutoFitBounds = ({ positions }: { positions: number[][] }) => {
    const map = useMap();

    useEffect(() => {
        if (!positions || positions.length === 0) return;

        // Crear límites para todas las posiciones
        const bounds = new LatLngBounds(positions.map(pos => [pos[0], pos[1]]));
        map.fitBounds(bounds, {
            padding: [50, 50],
            animate: true,
        });

    }, [positions, map]);

    return null;
};

export const OrderTrackingMap = ({ storeOrderId }: { storeOrderId: string }) => {
    useWebSocketOrder(
        window.location.hostname === "localhost"
            ? `ws://localhost:3450`
            : `${port}`,
        storeOrderId
    );

    const { data: positions = [], isLoading, isError } = useRouteData(storeOrderId);

    // Si positions es un array, tomamos el primer elemento
    const position = Array.isArray(positions) ? positions[0] : positions;

    // Convertir coordenadas a formato [lat, lng] para Leaflet
    const storeCoords = position?.store?.coordinates
        ? [position.store.coordinates[1], position.store.coordinates[0]]
        : null;

    const destinationCoords = position?.destination?.coordinates
        ? [position.destination.coordinates[1], position.destination.coordinates[0]]
        : null;

    const currentLocationCoords = position?.currentLocation
        ? [position.currentLocation[1], position.currentLocation[0]]
        : null;

    // Preparar todas las posiciones para el ajuste de límites
    const allPositions: number[][] = [];
    if (storeCoords) allPositions.push(storeCoords);
    if (destinationCoords) allPositions.push(destinationCoords);
    if (currentLocationCoords) allPositions.push(currentLocationCoords);

    // Estado para mostrar mensajes de error
    const [mapError, setMapError] = useState<string | null>(null);

    // Actualizar estado de error
    useEffect(() => {
        if (isError) {
            setMapError("Error al cargar los datos de ubicación");
        } else if (isLoading) {
            setMapError("Cargando datos de ubicación...");
        } else if (!position) {
            setMapError("No se encontraron datos de ubicación");
        } else {
            setMapError(null);
        }
    }, [isError, isLoading, position]);



    return (
        <div className="h-96 w-full relative">
            {mapError && (
                <div className="absolute top-2 left-0 right-0 z-[1000] bg-yellow-500 text-white p-2 text-center">
                    {mapError}
                </div>
            )}

            <MapContainer
                center={[23.13028, -82.35306]}
                zoom={14}
                className="h-full w-full rounded-lg"
            >
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                />

                {position && (
                    <>
                        {/* Ruta desde la tienda hasta el destino */}
                        {storeCoords && destinationCoords && (
                            <Route start={storeCoords} end={destinationCoords} color="#3b82f6" />
                        )}

                        {/* Trayecto pendiente (desde ubicación actual hasta destino) */}
                        {currentLocationCoords && destinationCoords && (
                            <Route
                                start={currentLocationCoords}
                                end={destinationCoords}
                                color="#10b981"
                                weight={9}
                            />
                        )}



                        {/* Marcador de la tienda */}
                        {storeCoords && (
                            <Marker
                                position={storeCoords as LatLngExpression}
                                icon={storeIcon}
                            >
                                <div className="p-2 bg-white absolute rounded-lg shadow-lg">
                                    <h3 className="font-bold">Tienda</h3>
                                    <p>{position.store?.name || 'Tienda de origen'}</p>
                                </div>
                            </Marker>
                        )}

                        {/* Marcador del destino (cliente) */}
                        {destinationCoords && (
                            <Marker
                                position={destinationCoords as LatLngExpression}
                                icon={destinationIcon}
                            >
                                <div className="p-2 bg-white absolute rounded-lg shadow-lg">
                                    <h3 className="font-bold">Destino</h3>
                                    <p>Ubicación del cliente</p>
                                </div>
                            </Marker>
                        )}

                        {/* Marcador de ubicación actual */}
                        {currentLocationCoords && (
                            <div className="relative">
                                <Marker
                                    position={currentLocationCoords as LatLngExpression}
                                    icon={currentLocationIcon}
                                >
                                    <div className="p-2 bg-white absolute rounded-lg shadow-lg">
                                        <h3 className="font-bold">Ubicación Actual</h3>
                                        <p>Posición actual del pedido</p>
                                    </div>
                                </Marker>
                            </div>
                        )}

                        {/* Ajustar límites para que se vean todos los marcadores */}
                        <AutoFitBounds positions={allPositions} />
                    </>
                )}
            </MapContainer>
        </div>
    );
};