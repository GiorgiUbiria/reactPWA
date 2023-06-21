import React from 'react';

const DifficultyModal = ({ difficulties, onDifficultyChange }) => {
  return (
    <div className="modal">
      <h3>Choose Difficulty</h3>
      <div className="difficulty-buttons">
        {Object.keys(difficulties).map((level) => (
          <button key={level} onClick={() => onDifficultyChange(level)} className="difficulty-button">
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultyModal;
