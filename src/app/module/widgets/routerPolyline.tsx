// components/Route.jsx
import { useEffect, useState } from 'react';
import { Polyline } from 'react-leaflet';
import axios from 'axios';

const Route = ({ start, end }: { start: number[], end: number[] }) => {
    const [route, setRoute] = useState([]);

    useEffect(() => {
        const fetchRoute = async () => {
            try {
                // Formatear coordenadas para OSRM: [lon,lat]
                const coords = `${start[1]},${start[0]};${end[1]},${end[0]}`;

                // Usar proxy CORS
                const proxyUrl = "https://cors-anywhere.herokuapp.com/";
                const targetUrl = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;

                /* 
                  // Formatear coordenadas para Mapbox: [lon,lat]
                const coords = `${start[1]},${start[0]};${end[1]},${end[0]}`;
                const mapboxToken = 'TU_TOKEN_MAPBOX'; // Reemplaza con tu token
                
                const response = await axios.get(
                  `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}?geometries=geojson&access_token=${mapboxToken}`
                 );
                
                */

                const response = await axios.get(proxyUrl + targetUrl, {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });

                if (response.data.routes.length > 0) {
                    // Convertir GeoJSON a formato [lat, lon] para Leaflet
                    const routeData = response.data.routes[0].geometry.coordinates;
                    const formattedRoute = routeData.map((coord: any) => [coord[1], coord[0]]);
                    setRoute(formattedRoute);
                }
            } catch (error) {
                console.error("Error fetching route:", error);
                // Fallback a línea recta si hay error
                setRoute([start, end] as any);
            }
        };

        fetchRoute();
    }, [start, end]);

    return route.length > 0 ? (
        <Polyline
            positions={route}
            color="#3b82f6"
            weight={6}
            opacity={0.8}
        />
    ) : null;
};

export default Route;