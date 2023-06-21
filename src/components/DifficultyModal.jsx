import React, { useMemo, useRef, useCallback } from 'react';

const DifficultyModal = ({ difficulties, onDifficultyChange }) => {
  const modalRef = useRef(null);

  const handleButtonClick = useCallback(
    (level) => {
      if (window.innerWidth <= 720 && (level === 'hard' || level === 'extreme')) {
        modalRef.current.classList.add('show-message');
        setTimeout(() => {
          modalRef.current.classList.remove('show-message');
        }, 2000);
      } else {
        onDifficultyChange(level);
      }
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
          disabled={window.innerWidth <= 720 && (level === 'hard' || level === 'extreme')}
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
        <p className="mobile-message">Hard and Extreme difficulties are not available on mobile yet!</p>
      )}
    </div>
  );
};

export default DifficultyModal;
