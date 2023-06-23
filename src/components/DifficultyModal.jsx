import React, { useMemo, useRef, useCallback } from 'react';

const DifficultyModal = ({ difficulties, onDifficultyChange }) => {
  const modalRef = useRef(null);

  const handleButtonClick = useCallback(
    (level) => {
      onDifficultyChange(level);
    },
    [onDifficultyChange]
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