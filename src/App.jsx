import { useState, useEffect, useMemo, useCallback } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import DifficultyModal from './components/DifficultyModal';
import CategoryModal from './components/CategoryModal';
import shuffle from './utilities/shuffle';
import useAppBadge from './hooks/useAppBadge';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'

const cardFlip = new Audio(process.env.PUBLIC_URL + '/sounds/cardFlip.mp3');
const easyMediumBackground = new Audio(process.env.PUBLIC_URL + '/sounds/easyMediumBackground.mp3');
const hardExtremeBackground = new Audio(process.env.PUBLIC_URL + '/sounds/hardExtremeBackground.mp3');

library.add(fas, faLightbulb)

function App() {
  const [wins, setWins] = useState(0);
  const [cards, setCards] = useState([]);
  const [pickOne, setPickOne] = useState(null);
  const [pickTwo, setPickTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [showDifficultyModal, setShowDifficultyModal] = useState(true);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [category, setCategory] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [cardFlipAudio] = useState(cardFlip);
  const [easyMediumBackgroundAudio] = useState(easyMediumBackground);
  const [hardExtremeBackgroundAudio] = useState(hardExtremeBackground);

  const difficulties = useMemo(
    () => ({
      easy: { cardsCount: 12 },
      medium: { cardsCount: 16 },
      hard: { cardsCount: 20 },
      extreme: { cardsCount: 20 },
    }),
    []
  );

  const categories = ['Web Development', 'Databases', 'Programming Languages', 'Programming Tools'];

  const [setBadge, clearBadge] = useAppBadge();

  const handleClick = useCallback((card) => {
    if (gameOver) {
      return;
    }

    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
      cardFlipAudio.play();
    }
  }, [gameOver, disabled, pickOne, cardFlipAudio]);

  const handleTimer = useCallback(() => {
    setTimer((prevTimer) => prevTimer - 1);
  }, []);

  const handleTurn = useCallback(() => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
    setShowHint(false);
  }, []);

  const handleNewGame = useCallback(() => {
    setWins(0);
    setDifficulty(null);
    setCategory(null);
    setShowCategoryModal(true);
    setShowDifficultyModal(true);
    setCards([]);
    setShowHint(true);
    handleTurn();
    setTimer(60);
    setGameOver(false);
    clearBadge();
    easyMediumBackgroundAudio.pause();
    easyMediumBackgroundAudio.currentTime = 0;
    hardExtremeBackgroundAudio.pause();
    hardExtremeBackgroundAudio.currentTime = 0;
  }, [handleTurn, clearBadge, easyMediumBackgroundAudio, hardExtremeBackgroundAudio]);

  const handleDifficultyChange = useCallback((newDifficulty) => {
    setDifficulty(newDifficulty);
    setShowDifficultyModal(false);

    if (newDifficulty === "extreme") {
      setTimer(60);
      setGameOver(false);
    }
  }, []);

  const handleCategoryChange = useCallback((newCategory) => {
    setCategory(newCategory);
    setShowCategoryModal(false);
  }, []);

  const toggleHint = useCallback(() => {
    if (!hintUsed) {
      setShowHint((prevShowHint) => !prevShowHint);
      setHintUsed(true);
    }
  }, [hintUsed]);

  useEffect(() => {
    if (showHint) {
      const unmatchedCards = cards.filter((card) => !card.matched);
      const randomIndexOne = Math.floor(Math.random() * unmatchedCards.length);
      let randomIndexTwo = Math.floor(Math.random() * unmatchedCards.length);

      while (randomIndexTwo === randomIndexOne) {
        randomIndexTwo = Math.floor(Math.random() * unmatchedCards.length);
      }

      const hintCardOne = unmatchedCards[randomIndexOne];
      const hintCardTwo = unmatchedCards[randomIndexTwo];

      setPickOne(hintCardOne);
      setPickTwo(hintCardTwo);
    } else {
      setPickOne(null);
      setPickTwo(null);
    }
  }, [showHint, cards]);

  useEffect(() => {
    if (difficulty && category) {
      setCards(shuffle(difficulties[difficulty].cardsCount, category));
      setShowDifficultyModal(false);

      if (difficulty === 'easy' || difficulty === 'medium') {
        easyMediumBackgroundAudio.currentTime = 0;
        easyMediumBackgroundAudio.play();
        hardExtremeBackgroundAudio.pause();
      } else {
        easyMediumBackgroundAudio.pause();
        hardExtremeBackgroundAudio.play();
      }
    }
  }, [difficulties, difficulty, category, setShowDifficultyModal, easyMediumBackgroundAudio, hardExtremeBackgroundAudio]);

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
  }, [difficulty, gameOver, handleTimer, timer]);

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
  }, [handleTurn, pickOne, pickTwo]);

  useEffect(() => {
    const hasUnmatchedCard = cards.some((card) => !card.matched);

    if (cards.length && !hasUnmatchedCard) {
      setWins((prevWins) => prevWins + 1);
      handleTurn();
      setCards((prevCards) => shuffle(prevCards.length));
      setBadge();
    }
  }, [cards, difficulty, handleTurn, setBadge]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (difficulty !== 'easy' && difficulty !== 'medium') {
        hardExtremeBackgroundAudio.pause();
        hardExtremeBackgroundAudio.currentTime = 0;
      }
    };
  }, [difficulty, hardExtremeBackgroundAudio]);

  return (
    <div className="main-body">
      {showCategoryModal && (
        <CategoryModal categories={categories} onCategoryChange={handleCategoryChange} />
      )}
      {category && (
        <>
          <Header handleNewGame={handleNewGame} wins={wins} difficulty={difficulty} showHint={showHint} toggleHint={toggleHint} hintUsed={hintUsed} />
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
              screenWidth={screenWidth}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;