import { Button } from "@nextui-org/react";
import React, { useState, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { FaMapLocationDot } from "react-icons/fa6";
import { Modal_Component } from "./modal";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { API_KEY_MAP } from "../../../config/env";

// Configuración de íconos
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

interface Input_Text {
  label: string;
  placeholder: string;
  data: string;
  coordinatesLat: string;
  coordinatesLon: string;
  disable?: boolean;
}


// Componente para actualizar el centro del mapa
const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
};

const osrmAxios = axios.create({
  withCredentials: false,
  headers: {
    Authorization: undefined
  }
});


export const Input_Adress: React.FC<Input_Text> = ({
  label,
  placeholder,
  data,
  coordinatesLat,
  coordinatesLon,
  disable,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();
  const [mapCenter, setMapCenter] = useState<[number, number]>([23.13028, -82.35306]);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [addressInput, setAddressInput] = useState(watch(data) || "");
  const inputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Geocodificación: convertir dirección a coordenadas
  const geocodeAddress = async (address: string) => {
    if (!address.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await osrmAxios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=CU`,
        {
          timeout: 10000,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            // Agregar Origin si es necesario
            'Origin': window.location.origin
          }
        }
      );

      if (response.data && response.data.length > 0) {
        const result = response.data[0];
        const coordinates: [number, number] = [
          parseFloat(result.lat),
          parseFloat(result.lon),
        ];

        setMarkerPosition(coordinates);
        setMapCenter(coordinates);
        setValue(coordinatesLat, coordinates[0]);
        setValue(coordinatesLon, coordinates[1]);
        setValue(data, address);
      } else {
        setError("No se encontró la dirección. Intenta con otra descripción.");
      }
    } catch (err) {
      console.error("Error en geocodificación:", err);
      setError("Error al buscar la dirección. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Geocodificación inversa: convertir coordenadas a dirección
  const reverseGeocode = async (lat: number, lng: number) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await osrmAxios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          timeout: 10000,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            // Agregar Origin si es necesario
            'Origin': window.location.origin
          }
        }
      );


      if (response.data && response.data.display_name) {
        const address = response.data.display_name;
        setAddressInput(address);
        setValue(data, address);
        setValue(coordinatesLat, lat);
        setValue(coordinatesLon, lng);
      } else {
        setError("The address could not be obtained for these coordinates.");
      }
    } catch (err) {
      console.error("Error en geocodificación inversa:", err);
      setError("Error obtaining the address.");
    } finally {
      setIsLoading(false);
    }
  };


  // Manejador de clic en el mapa
  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const newCoords: [number, number] = [e.latlng.lat, e.latlng.lng];
    setMarkerPosition(newCoords);
    reverseGeocode(e.latlng.lat, e.latlng.lng);
  };

  // Efecto para agregar el evento de clic al mapa cuando esté listo
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.on('click', handleMapClick);

      // Limpieza: remover el evento al desmontar
      return () => {
        mapRef.current?.off('click', handleMapClick);
      };
    }
  }, [mapRef.current]);

  // Manejar búsqueda de dirección
  const handleSearch = () => {
    geocodeAddress(addressInput);
  };

  // Manejar tecla Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Actualizar estado cuando cambia el valor del formulario
  useEffect(() => {
    const subscription = watch((value) => {
      setAddressInput(value[data] || "");
    });
    return () => subscription.unsubscribe();
  }, [watch, data]);

  const onActionChange = (closeModal: () => void) => {
    closeModal();
  };

  return (
    <div className="flex relative flex-col">
      <div className="flex justify-between items-center">
        <label
          htmlFor={label}
          aria-label="Seleccionar input"
          className={`block mb-2 capitalize text-base font-medium ${disable ? " text-gray-500" : "text-gray-900 "
            } `}
        >
          {label}
        </label>
        <div className="flex space-x-1">
          <Button
            color="primary"
            size="sm"
            type="button"
            className="pointer-events-auto px-2"
            radius="full"
            onPress={handleSearch}
            variant="light"
            isLoading={isLoading}
            disabled={disable || isLoading}
          >
            Buscar
          </Button>
          <Modal_Component
            onActionChange={(closeModal) => onActionChange(closeModal)}
            component={
              <div className="h-[400px] mb-10">
                <MapContainer
                  center={mapCenter}

                  zoom={14}
                  className="h-full w-full rounded-lg"
                  ref={(instance) => {
                    if (instance) {
                      mapRef.current = instance;
                      instance.on('click', handleMapClick);
                    }
                  }}
                >
                  <TileLayer
                    url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${API_KEY_MAP}`}
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                  />
                  <MapUpdater center={mapCenter} />
                  {markerPosition && (
                    <Marker position={markerPosition} icon={defaultIcon} />
                  )}
                </MapContainer>
                {markerPosition && (
                  <div className="mt-2 p-2 bg-white rounded shadow">
                    <p className="text-sm">
                      <strong>Address:</strong> {addressInput}
                    </p>
                  </div>
                )}
              </div>
            }
            isAlert="yes"
            title={"Seleccionar ubicación en el mapa"}
            size="5xl"
            onClick={() => { }}
            className=""
            scroll={"normal"}
          >
            <Button
              color="primary"
              size="sm"
              type="button"
              className="pointer-events-auto px-2 "
              radius="full"
              onPress={(e: any) => e.preventDefault()}
              variant="light"
              startContent={<FaMapLocationDot size={24} />}
              title="Ubicacion"
              disabled={disable}
            >
              Mapa
            </Button>
          </Modal_Component>
        </div>
      </div>

      <div className="flex">
        <input
          type="text"
          ref={inputRef}
          id={label}
          aria-describedby="helper-text-explanation"
          aria-label="Seleccionar input"
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disable || isLoading}
          className={`flex-grow bg-gray-50 mb-2 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 ${errors[data]
            ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700"
            : "text-gray-900"
            }`}
          placeholder={placeholder}
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}

      {errors[data] && (
        <span className="text-red-500 absolute italic -bottom-5">
          {errors[data].message as string}
        </span>
      )}
    </div>
  );
};