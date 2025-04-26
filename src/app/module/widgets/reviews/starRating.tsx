import { useState } from "react";
import { FaStar } from "react-icons/fa";

export const StarRatingSelect = ({selectedStars,setSelectedStars}:{selectedStars:number,setSelectedStars:(item:number)=> void}) => {
    const [hoverStars, setHoverStars] = useState(0);

    return (
      <div style={{ display: "flex", gap: "4px" }}>
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;

          return (
            <div className="cursor-pointer z-20">
              <label key={index}>
                <FaStar
                  size={30}
                  className={`cursor-pointer duration-250 ${
                    ratingValue <= (hoverStars || selectedStars)
                      ? "text-yellow-300"
                      : "text-gray-300"
                  }`}
                  style={{
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={() => setHoverStars(ratingValue)}
                  onMouseLeave={() => setHoverStars(0)}
                  onClick={() => setSelectedStars(ratingValue)}
                />
              </label>
            </div>
          );
        })}
      </div>
    );
  };