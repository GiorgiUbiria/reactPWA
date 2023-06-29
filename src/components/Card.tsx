import { useMemo } from "react";

interface CardProps {
  image: string;
  onClick: () => void;
  selected: boolean;
  blindfolded: boolean;
}

const Card: React.FC<CardProps> = ({
  image,
  selected,
  onClick,
  blindfolded,
}) => {
  const memoizedImage = useMemo(() => image, [image]);

  return (
    <div className="card">
      <div className={selected ? "selected" : ""}>
        <div className="card-face">
          {blindfolded ? (
            <img src="/assets/blindfolded.png" alt="Blindfolded" />
          ) : (
            <img alt="Image" src={memoizedImage} className="card-image" />
          )}
        </div>
        <div className="card-back" onClick={onClick}>
          <img alt="" src="/logo.png" className="card-image" />
        </div>
      </div>
    </div>
  );
};

export default Card;
