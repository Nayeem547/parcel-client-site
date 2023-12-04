import React, { useState } from 'react';
import DynamicStarRating from './DynamicStarRating';

const Rateing = () => {
    const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div>
      <h2>Dynamic Star Rating</h2>
      <DynamicStarRating rating={rating} onRatingChange={handleRatingChange} />
      <p>Selected Rating: {rating}</p>
    </div>
  );
};

export default Rateing;