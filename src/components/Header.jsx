import React, { useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = ({ handleNewGame, wins, difficulty, showHint, toggleHint, hintUsed }) => {
  useEffect(() => {
    document.title = `${wins} wins`;
  }, [wins]);

  const memoizedDifficulty = useMemo(() => difficulty, [difficulty]);

  return (
    <header className="header">
      <h4>{wins} wins</h4>
      <h3>Memory Game</h3>
      {memoizedDifficulty && <h3>Current difficulty: {memoizedDifficulty}</h3>}
      <button onClick={handleNewGame}>New Game</button>
      {difficulty === "hard" || difficulty === "extreme" ? (
        <button
          onClick={toggleHint}
          className={`hint-button ${showHint ? 'active' : ''} ${hintUsed ? 'disabled' : ''}`}
          disabled={hintUsed}
        >
          <FontAwesomeIcon icon="fa-solid fa-lightbulb" />
        </button>
      ) : null}
    </header>
  );
};

export default Header;