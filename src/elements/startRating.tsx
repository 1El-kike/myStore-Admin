import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa6';

export const StarRating:React.FC<{rating:number}> = ({ rating }) => {
  // Asegúrate de que rating esté entre 1 y 5
  const stars = Array.from({ length: 5 }, (_, index) => {
    return index < rating ? <FaStar key={index} size={18} color="gold" /> : <FaRegStar size={18} key={index} />;
  });

  return (
    <div className="flex">
      {stars}
    </div>
  );
};

