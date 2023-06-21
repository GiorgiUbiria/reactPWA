import { useState, useEffect, useMemo } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import DifficultyModal from './components/DifficultyModal';
import shuffle from './utilities/shuffle';

function App() {
  const [wins, setWins] = useState(0);
  const [cards, setCards] = useState([]);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [showDifficultyModal, setShowDifficultyModal] = useState(true);
  const [timer, setTimer] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  const difficulties = useMemo(
    () => ({
      easy: { cardsCount: 12 },
      medium: { cardsCount: 16 },
      hard: { cardsCount: 24 },
      extreme: { cardsCount: 24 },
    }),
    []
  );

  const handleClick = (card) => {
    if (gameOver) {
      return;
    }

    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTimer = () => {
    setTimer((prevTimer) => prevTimer - 1);
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  const handleNewGame = () => {
    setWins(0);
    handleTurn();
    setDifficulty(null);
    setShowDifficultyModal(true);
    setCards([]);
    setTimer(10);
    setGameOver(false);
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setShowDifficultyModal(false);

    if (newDifficulty === "extreme") {
      setTimer(10);
      setGameOver(false);
    }
  };

  useEffect(() => {
    if (difficulty) {
      setCards(shuffle(difficulties[difficulty].cardsCount));
    }
  }, [difficulties, difficulty]);

  useEffect(() => {
    let intervalId;

    if (difficulty === "extreme" && !gameOver) {
      intervalId = setInterval(() => {
        if (timer > 0) {
          handleTimer();
        } else {
          setGameOver(true);
          clearInterval(intervalId);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [difficulty, gameOver, timer]);

  useEffect(() => {
    let pickTimer;

    if (pickOne && pickTwo) {
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        handleTurn();
      } else {
        setDisabled(true);
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [pickOne, pickTwo]);

  useEffect(() => {
    const checkWin = cards.filter((card) => !card.matched);

    if (cards.length && checkWin.length < 1) {
      console.log('You win!');
      setWins((prevWins) => prevWins + 1);
      handleTurn();
      setCards(shuffle(difficulties[difficulty].cardsCount));
    }
  }, [cards, difficulties, difficulty]);

  return (
    <div className="main-body">
      <Header handleNewGame={handleNewGame} wins={wins} difficulty={difficulty} />
      {!gameOver && difficulty === "extreme" && (
        <div className="timer">
          <h3 className="timer-header">
            Time Remaining:  <span className="seconds"> {timer} </span> seconds
          </h3>
        </div>
      )}
      {gameOver && difficulty === "extreme" && (
        <div className="extreme-popup">
          <h2 className="extreme-warning">Game Over!</h2>
          <p className="extreme-text">You failed the EXTREME level.</p>
        </div>
      )}
      <div className={`grid ${difficulty}`}>
        {cards.map((card) => {
          const { image, matched } = card;

          return (
            <Card
              key={card.id}
              card={card}
              image={image}
              onClick={() => handleClick(card)}
              selected={card === pickOne || card === pickTwo || matched}
              className={gameOver && difficulty === "extreme" ? "disabled" : ""}
            />
          );
        })}
      </div>
      {showDifficultyModal && (
        <DifficultyModal
          difficulties={difficulties}
          onDifficultyChange={handleDifficultyChange}
        />
      )}
    </div>
  );
}

export default App;