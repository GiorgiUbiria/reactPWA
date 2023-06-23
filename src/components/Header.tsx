import { useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  handleNewGame: () => void;
  wins: number;
  difficulty: string;
  showHint: boolean;
  toggleHint: () => void;
  hintUsed: boolean;
}

const Header: React.FC<HeaderProps> = ({
  handleNewGame,
  wins,
  difficulty,
  showHint,
  toggleHint,
  hintUsed,
}) => {
  useEffect(() => {
    document.title = `${wins} wins`;
  }, [wins]);

  const memoizedDifficulty = useMemo(() => difficulty, [difficulty]);

  return (
    <header className="header">
      <h4>{wins} wins</h4>
      <h3>Memory Game</h3>
      {memoizedDifficulty && <h3>Current difficulty: {memoizedDifficulty}</h3>}
      <button onClick={handleNewGame} className='new-game-btn'>New Game</button>
      {difficulty === "hard" || difficulty === "extreme" ? (
        <button
          onClick={toggleHint}
          className={`hint-button ${showHint ? 'active' : ''} ${hintUsed ? 'disabled' : ''}`}
          disabled={hintUsed}
        >
          <FontAwesomeIcon icon={faLightbulb} />
        </button>
      ) : null}
    </header>
  );
};

export default Header;
