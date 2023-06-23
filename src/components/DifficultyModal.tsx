import { useMemo, useRef, useCallback } from 'react';
import { DifficultyType } from '../types/difficultyType';

interface DifficultyModalProps {
  difficulties: Record<string, DifficultyType>;
  onDifficultyChange: (newDifficulty: DifficultyType) => void;
  screenWidth: number;
}

const DifficultyModal: React.FC<DifficultyModalProps> = ({ difficulties, onDifficultyChange }) => {
  const modalRef = useRef(null);

  const handleButtonClick = useCallback(
    (level: string) => {
      const newDifficulty = difficulties[level];
      onDifficultyChange(newDifficulty);
    },
    [difficulties, onDifficultyChange]
  );

  const difficultyButtons = useMemo(
    () =>
      Object.keys(difficulties).map((level) => (
        <button
          key={level}
          onClick={() => handleButtonClick(level)}
          className="difficulty-button"
        >
          {level}
        </button>
      )),
    [difficulties, handleButtonClick]
  );

  return (
    <div className="modal" ref={modalRef}>
      <h3>Choose Difficulty</h3>
      <div className="difficulty-buttons">
        {difficultyButtons}
      </div>
      {window.innerWidth <= 720 && (
        <p className="mobile-message">Hard and Extreme difficulties are not yet optimized. Play at your own risk!</p>
      )}
    </div>
  );
};

export default DifficultyModal;