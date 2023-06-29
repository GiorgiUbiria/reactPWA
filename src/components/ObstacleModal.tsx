import { useMemo, useRef, useCallback } from 'react';
import { ObstacleType } from '../types/obstacleType';

type ObstaclesModalProps = {
  obstacles: string[];
  onObstacleChange: (obstacle: ObstacleType) => void;
};

const ObstaclesModal: React.FC<ObstaclesModalProps> = ({ obstacles, onObstacleChange }) => {
  const modalRef = useRef(null);

  const handleButtonClick = useCallback((obstacle: ObstacleType) => {
    onObstacleChange(obstacle);
  }, [onObstacleChange]);

  const obstacleButtons = useMemo(
    () =>
      obstacles.map((obstacle) => (
        <button
          key={obstacle}
          onClick={() => handleButtonClick(obstacle as ObstacleType)}
          className="obstacle-button"
        >
          {obstacle}
        </button>
      )),
    [obstacles, handleButtonClick]
  );

  return (
    <div className="obstacles-modal" ref={modalRef}>
      <h3>Choose Obstacle</h3>
      <div className="obstacle-buttons">{obstacleButtons}</div>
    </div>
  );
};

export default ObstaclesModal;