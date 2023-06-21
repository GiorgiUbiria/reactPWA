import React, { useMemo } from "react";

const Card = ({ image, selected, onClick }) => {
  const memoizedImage = useMemo(() => image, [image]);

  return (
    <div className="card">
      <div className={selected ? 'selected' : ''}>
        <div className="card-face">
          <img alt="" src={memoizedImage} className="card-image" />
        </div>
        <div className="card-back" onClick={onClick}>
          <img alt="" src="/logo.png" className="card-image" />
        </div>
      </div>
    </div>
  );
};

export default Card;