import React, { useMemo } from 'react';

const DifficultyModal = ({ difficulties, onDifficultyChange }) => {
  const difficultyButtons = useMemo(
    () =>
      Object.keys(difficulties).map((level) => (
        <button key={level} onClick={() => onDifficultyChange(level)} className="difficulty-button">
          {level}
        </button>
      )),
    [difficulties, onDifficultyChange]
  );

  return (
    <div className="modal">
      <h3>Choose Difficulty</h3>
      <div className="difficulty-buttons">{difficultyButtons}</div>
    </div>
  );
};


export default DifficultyModal;
