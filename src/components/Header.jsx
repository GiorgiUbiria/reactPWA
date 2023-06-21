import React, { useEffect, useMemo } from 'react';

const Header = ({ handleNewGame, wins, difficulty }) => {
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
    </header>
  );
};

export default Header;
