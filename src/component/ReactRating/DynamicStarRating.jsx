import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../ReactRating/DynamicStarRating.css';

const DynamicStarRating = ({ rating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(null);

  const handleStarClick = (clickedRating) => {
    onRatingChange(clickedRating);
  };

  const handleStarHover = (hoveredRating) => {
    setHoveredRating(hoveredRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(null);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={starValue}
              checked={rating === starValue}
              onChange={() => handleStarClick(starValue)}
            />
            <FaStar
              className={`star ${starValue <= rating ? 'selected' : ''}`}
              onMouseEnter={() => handleStarHover(starValue)}
              onMouseLeave={handleStarLeave}
            />
          </label>
        );
      })}
    </div>
  );
};

export default DynamicStarRating;
