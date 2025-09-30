import React from "react";
import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6";

export const StarRating: React.FC<{ rating: number, size: number }> = ({ rating, size = 18 }) => {
  // Calcular la cantidad de estrellas completas y si hay media estrella
  const fullStars = Math.floor(rating); // Estrellas completas
  const hasHalfStar = rating % 1 >= 0.5; // Verifica si hay media estrella

  return (
    <div className="flex">
      {/* Renderizar estrellas completas */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar size={size} key={index} className="text-yellow-400" />
      ))}
      {/* Renderizar media estrella si corresponde */}
      {hasHalfStar && <FaStarHalfStroke size={size} className="text-yellow-400" />}
    </div>
  );
};
