import { useEffect } from 'react';

const Header = ({ handleNewGame, wins, difficulty }) => {
  useEffect(() => {
    document.title = `${wins} wins`;
  }, [wins]);

  return (
    <header className="header">
      <h4>{wins} wins</h4>
      <h3>Memory Game</h3>
      {
        difficulty &&
        <h3>Current difficulty: {difficulty}</h3>
      }
      <button onClick={handleNewGame}>New Game</button>
    </header>
  );
};

export default Header;
