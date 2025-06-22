// components/Route.tsx
import { useEffect, useState } from 'react';
import { Polyline } from 'react-leaflet';
import axios from 'axios';


// Crear una instancia especial de Axios sin credenciales
const osrmAxios = axios.create({
    withCredentials: false,
    headers: {
        Authorization: undefined
    }
});

interface RouteProps {
    start: number[];
    end: number[];
    color?: string;
    dashArray?: string;
    weight?: number
}


const Route = ({ start, end, color = "#3b82f6", dashArray, weight = 4 }: RouteProps) => {
    const [route, setRoute] = useState<[number, number][]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchRoute = async () => {
            setLoading(true);
            setError(null);

            // Validación de coordenadas
            if (!start || !end || start.length !== 2 || end.length !== 2) {
                if (isMounted) {
                    setRoute([start, end] as [number, number][]);
                    setLoading(false);
                }
                return;
            }

            try {
                // Formatear coordenadas: [lon, lat] para OSRM
                const coords = `${start[1]},${start[0]};${end[1]},${end[0]}`;
                const targetUrl = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;

                // Solución 1: Usar un proxy alternativo que no requiera headers
                const proxyUrl = "https://api.allorigins.win/raw?url=";
                const fullUrl = proxyUrl + encodeURIComponent(targetUrl);

                const response = await osrmAxios.get(fullUrl, {
                    timeout: 10000,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        // Agregar Origin si es necesario
                        'Origin': window.location.origin
                    }
                });

                // Verificar si la respuesta tiene la estructura esperada
                if (response.data?.routes?.[0]?.geometry?.coordinates) {
                    const routeData = response.data.routes[0].geometry.coordinates;

                    // Transformar [lon, lat] a [lat, lon] para Leaflet
                    const formattedRoute = routeData.map((coord: number[]) => [
                        coord[1], // lat
                        coord[0]  // lon
                    ]);

                    if (isMounted) {
                        setRoute(formattedRoute);
                    }
                } else {
                    console.warn("Estructura de respuesta inesperada", response.data);
                    throw new Error("Estructura de respuesta inesperada");
                }
            } catch (error) {
                console.error("Error fetching route, using straight line", error);
                if (isMounted) {
                    setError("Error al obtener la ruta. Mostrando línea directa.");
                    setRoute([start, end] as [number, number][]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchRoute();

        return () => {
            isMounted = false;
        };
    }, [start, end]);

    if (loading) {
        return (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[1000]">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    Cargando ruta...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-white p-2 text-center z-[1000]">
                {error}
            </div>
        );
    }

    return route.length > 0 ? (
        <Polyline
            positions={route}
            color={color}
            weight={weight}
            opacity={0.8}
            dashArray={dashArray}
        />
    ) : null;
};

export default Route;