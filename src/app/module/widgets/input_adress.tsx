import { Button } from "@nextui-org/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { FaMapLocationDot } from "react-icons/fa6";
import { Modal_Component } from "./modal";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

interface Input_Text {
  label: string;
  placeholder: string;
  data: string;
  disable?: true;
}

export const Input_Adress: React.FC<Input_Text> = ({
  label,
  placeholder,
  data,
  disable,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex relative flex-col">
      <div className="flex justify-between  items-center">
        <label
          htmlFor={label}
          aria-label="Seleccionar input"
          className={`block mb-2 capitalize  text-base font-medium ${
            disable ? " text-gray-500" : "text-gray-900 "
          } `}
        >
          {label}
        </label>
        <Modal_Component
          component={
            <MapContainer
              center={[81.505, 22.09]}
              zoom={4}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[81.505, 22.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          }
          isAlert="yes"
          title={"Add Location"}
          size="5xl"
          onClick={() => {}}
          //  onActionChange={(closeModal) => onActionChange(closeModal)}
          className=""
          //  onDiscardChange={onDiscardChange}
          scroll={"normal"}
        >
          <div>
            <Button
              color="primary"
              size="sm"
              className="pointer-events-auto px-2 "
              radius="full"
              variant="light"
              startContent={<FaMapLocationDot size={24} />}
              title="Ubicacion"
            >
              Location
            </Button>
          </div>
        </Modal_Component>
      </div>
      {disable ? (
        <input
          type="text"
          disabled
          id={label}
          aria-label="Seleccionar input"
          aria-describedby="helper-text-explanation"
          className={`bg-gray-50 mb-2 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            errors[data]
              ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
              : "text-gray-900"
          }`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          {...register(data, { required: "This field is required" })}
          id={label}
          aria-describedby="helper-text-explanation"
          aria-label="Seleccionar input"
          className={`bg-gray-50 mb-2 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            errors[data]
              ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 "
              : "text-gray-900"
          }`}
          placeholder={placeholder}
        />
      )}

      {errors[data] && (
        <span className="text-red-500 absolute italic -bottom-5">
          {errors[data].message}
        </span>
      )}
    </div>
  );
};
