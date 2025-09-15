import React, { useState } from 'react'
import { FaDollarSign, FaEuroSign, FaLiraSign, FaWonSign, FaYenSign } from 'react-icons/fa';

export interface TypeSelectMony {
  elemen: any;
  value: string;
}

//funcion de select el tipo de moneda
export const SelectMony: React.FC<{
  set: React.Dispatch<React.SetStateAction<number>>;
  indexPosition: number;
  typemony: TypeSelectMony[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = React.memo(({ set, typemony, indexPosition, setIsOpen }) => {

  const radius = 50; // Radio del círculo



  const totalItems = typemony.length;
  const rotatetop = () => {
    set((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const rotatebottom = () => {
    set((prevIndex) => (prevIndex + 1) % totalItems);
  };

  return (
    <>
      <div className="absolute bottom-[225px] -left-8 lg:-left-[110px] lg:bottom-[182px]  z-20 animate-opacityonly">
        {typemony.map((item, index) => {
          const angle = (index / totalItems) * (2 * Math.PI); // Convertir a radianes
          const x = radius * Math.cos(angle) + radius; // Ajustar para centrar
          const y = radius * Math.sin(angle) + radius; // Ajustar para centrar

          return (
            <div
              key={item.value + index}
              className="absolute bg-gray-200 rounded-md border border-gray-500 p-3"
              style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                opacity: index === indexPosition ? 1 : 0.5,
                transition: "opacity 0.3s, transform 0.3s",
                transform:
                  index === indexPosition ? "scale(1.2)" : "scale(1)",
              }}
            >
              {item.elemen}
            </div>
          );
        })}
        <div
          onMouseLeave={() => setIsOpen(false)}
          className="absolute p-10 -left-[10px] top-[105px] gap-3 flex "
        >
          <button
            type="button"
            className="border animate-pulsesecondy hover:animate-none border-gray-300 bg-gray-200 px-2  rounded-md py-1"
            onClick={rotatetop}
          >
            ←
          </button>
          <button
            type="button"
            className="border animate-pulsesecondy hover:animate-none border-gray-300 bg-gray-200 px-2 rounded-md  py-1"
            onClick={rotatebottom}
          >
            →
          </button>
        </div>
      </div>
    </>
  );
});
