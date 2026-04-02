import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_URL } from "../../../../../config/env";
import { Image } from "@nextui-org/react";

export const InventoryStore = () => {
    const [isEnter, setIsEnter] = useState(false);
    const redirect = useNavigate();

    return (
        <div
            onMouseLeave={() => setIsEnter(false)}
            onMouseEnter={() => setIsEnter(true)}
            className="w-full flex justify-center items-center h-full relative"
        >
            <div
                className={`${isEnter &&
                    "transition-all duration-300 scale-50 translate-x-16 translate-y-5"
                    } transition-all duration-300 absolute scale-150 aspect-video top-2 clip-inventoryStore overflow-hidden`}
            >
                <Image
                    isBlurred
                    src={`${PUBLIC_URL}photo-1552664730-d307ca884978.jpeg`}
                    className=" inset-0 w-full h-full object-cover"
                    alt="Inventory Preview"
                />
                <div className=" inset-0 bg-gradient-to-br from-blue-900/40 to-transparent" />
            </div>

            <div className="z-20 text-white w-full pl-5 h-full justify-center items-start flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">📦</span>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Inventario</h1>
                </div>
                <div className="w-8 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-3" />
                <p className="text-white text-xs md:text-sm text-wrap md:w-[90%] leading-relaxed opacity-90">
                    Controla stock, gestiona productos y visualiza disponibilidad en tiempo real.
                </p>
                <button
                    onClick={() => redirect("/inventory")}
                    className={`${isEnter ? "animate-pulse scale-105" : ""
                        } z-10 mt-5 transition-all duration-300 hover:scale-110 active:scale-95 text-white bg-gradient-to-br from-cyan-500 via-blue-600 to-blue-700 hover:from-cyan-400 hover:to-blue-800 hover:shadow-lg hover:shadow-cyan-500/50 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-semibold rounded-lg text-sm px-6 py-2.5 text-center transition-all drop-shadow-md`}
                >
                    <span className="flex items-center gap-2">
                        <span>→</span> Acceder al Inventario
                    </span>
                </button>
            </div>
        </div>
    );
};