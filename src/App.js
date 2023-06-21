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

  const difficulties = useMemo(
    () => ({
      easy: { cardsCount: 12 },
      medium: { cardsCount: 16 },
      hard: { cardsCount: 24 },
    }),
    []
  );

  const handleClick = (card) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
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
  };
  
  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setShowDifficultyModal(false);
  };

  useEffect(() => {
    if (difficulty) {
      setCards(shuffle(difficulties[difficulty].cardsCount));
    }
  }, [difficulties, difficulty]);

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
