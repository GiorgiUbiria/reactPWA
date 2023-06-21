import { useState, useEffect, useMemo } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import shuffle from './utilities/shuffle';

function App() {
  const [wins, setWins] = useState(0);
  const [cards, setCards] = useState([]);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');

  const difficulties = useMemo(() => ({
    easy: { cardsCount: 6 },
    medium: { cardsCount: 12 },
    hard: { cardsCount: 16 },
  }), []);

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
    setCards(shuffle(difficulties[difficulty].cardsCount));
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

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

  useEffect(() => {
    setCards(shuffle(difficulties[difficulty].cardsCount));
  }, [difficulties, difficulty]);

  return (
    <>
      <Header
        handleNewGame={handleNewGame}
        wins={wins}
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
      />
      <div className="grid">
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
    </>
  );
}

export default App;
