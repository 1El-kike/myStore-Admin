import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PUBLIC_URL } from "../../../../../config/env";
import { Image } from "@nextui-org/react";

export const UserAdminStore = React.memo(() => {
    const [isEnter, setIsEnter] = useState(false);
    const redirect = useNavigate();

    return (
        <div
            onMouseLeave={() => setIsEnter(false)}
            onMouseEnter={() => setIsEnter(true)}
            className="w-full flex justify-center items-center h-full relative group"
        >
            <div
                className={`${isEnter && "transition-all duration-300 scale-50 translate-x-12 translate-y-4"
                    } transition-all duration-300 absolute scale-150 aspect-video top-2 clip-userAdminStore overflow-hidden`}
            >
                <img
                    src={`${PUBLIC_URL}usermanager.jpg`}
                    className=" inset-0 w-full h-full object-cover"
                    alt="User Administration"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/35 to-transparent" />
            </div>

            <div className="z-20 text-white w-full pl-5 h-full justify-center items-start flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">👥</span>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Usuarios</h1>
                </div>
                <div className="w-8 h-1 bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full mb-3" />
                <p className="text-white text-xs md:text-sm text-wrap md:w-[90%] leading-relaxed opacity-90">
                    Asigna roles, gestiona permisos y administra accesos de tu equipo.
                </p>
                <button
                    onClick={() => redirect("/users/management")}
                    className={`${isEnter ? "animate-pulse scale-105" : ""
                        } z-10 mt-5 transition-all duration-300 hover:scale-110 active:scale-95 text-white bg-gradient-to-br from-indigo-500 via-purple-600 to-violet-700 hover:from-indigo-400 hover:to-violet-800 hover:shadow-lg hover:shadow-indigo-500/50 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-semibold rounded-lg text-sm px-6 py-2.5 text-center transition-all drop-shadow-md`}
                >
                    <span className="flex items-center gap-2">
                        <span>→</span> Acceder a Usuarios
                    </span>
                </button>
            </div>
        </div>
    );
});