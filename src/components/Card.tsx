import { useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
            <LazyLoadImage
              alt="Image"
              src={memoizedImage}
              className="card-image"
              effect="blur"
            />
          )}
        </div>
        <div className="card-back" onClick={onClick}>
          <LazyLoadImage
            alt=""
            src="/logo.png"
            className="card-image"
            effect="blur"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
