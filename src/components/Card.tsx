import { useMemo } from "react";

interface CardProps {
  image: string;
  onClick: () => void;
  selected: boolean;
  className: string;
}

const Card: React.FC<CardProps> = ({ image, selected, onClick}) => {
  const memoizedImage = useMemo(() => image, [image]);

  return (
    <div className="card">
      <div className={selected ? "selected" : ""}>
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
