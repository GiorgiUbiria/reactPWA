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

import { CardType } from './types/cardType';
import { DifficultyType } from './types/difficultyType';
import { CategoryType } from './types/categoryType';
import { Timer } from './types/timerType';

const cardFlip = new Audio('/sounds/cardFlip.mp3');
const easyMediumBackground = new Audio('/sounds/easyMediumBackground.mp3');
const hardExtremeBackground = new Audio('/sounds/hardExtremeBackground.mp3');

library.add(fas, faLightbulb)

function App() {
  const [wins, setWins] = useState<number>(0);
  const [cards, setCards] = useState<CardType[]>([]);
  const [pickOne, setPickOne] = useState<CardType | null>(null);
  const [pickTwo, setPickTwo] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<DifficultyType | null>(null);
  const [showDifficultyModal, setShowDifficultyModal] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(60);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(true);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintUsed, setHintUsed] = useState<boolean>(false);
  const [cardFlipAudio] = useState<HTMLAudioElement>(cardFlip);
  const [easyMediumBackgroundAudio] = useState<HTMLAudioElement>(easyMediumBackground);
  const [hardExtremeBackgroundAudio] = useState<HTMLAudioElement>(hardExtremeBackground);

  const difficulties: Record<string, DifficultyType> = useMemo(
    () => ({
      easy: { key: 'easy', cardsCount: 12 },
      medium: { key: 'medium', cardsCount: 16 },
      hard: { key: 'hard', cardsCount: 20 },
      extreme: { key: 'extreme', cardsCount: 20 },
    }),
    []
  );

  const categories: CategoryType[] = ['Web Development', 'Databases', 'Programming Languages', 'Programming Tools'];

  const [setBadge, clearBadge] = useAppBadge();

  const handleClick = useCallback((card: CardType) => {
    if (gameOver) {
      return;
    }

    if (!disabled) {
      pickOne ? setPickTwo(card as CardType) : setPickOne(card as CardType);
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
    setHintUsed(false);
    handleTurn();
    setTimer(60);
    setGameOver(false);
    clearBadge();
    easyMediumBackgroundAudio.pause();
    easyMediumBackgroundAudio.currentTime = 0;
    hardExtremeBackgroundAudio.pause();
    hardExtremeBackgroundAudio.currentTime = 0;
  }, [handleTurn, clearBadge, easyMediumBackgroundAudio, hardExtremeBackgroundAudio]);

  const handleDifficultyChange = useCallback((newDifficulty: DifficultyType) => {
    console.log(typeof newDifficulty);
    setDifficulty(newDifficulty);
    console.log(typeof difficulty);
    
    setShowDifficultyModal(false);

    if (newDifficulty.key === "extreme") {
      setTimer(60);
      setGameOver(false);
    }
  }, [difficulty]);

  const handleCategoryChange = useCallback((newCategory: CategoryType) => {
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
      const cardsCount = difficulty ? difficulties[difficulty.key]?.cardsCount : null;
      
      if (cardsCount) {
        setCards(shuffle(cardsCount, category));
        setShowDifficultyModal(false);
  
        if (difficulty.key === 'easy' || difficulty.key === 'medium') {
          easyMediumBackgroundAudio.currentTime = 0;
          easyMediumBackgroundAudio.play();
          hardExtremeBackgroundAudio.pause();
        } else {
          easyMediumBackgroundAudio.pause();
          hardExtremeBackgroundAudio.play();
        }
      }
    }
  }, [difficulties, difficulty, category, setShowDifficultyModal, easyMediumBackgroundAudio, hardExtremeBackgroundAudio]);  
  
  useEffect(() => {
    let intervalId: Timer;

    if (difficulty?.key === "extreme" && !gameOver) {
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
    let pickTimer: Timer;

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
      setCards((prevCards) => shuffle(prevCards.length, category as string));
      setBadge();
    }
  }, [cards, difficulty, category, handleTurn, setBadge]);
  

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
      if (difficulty?.key !== 'easy' && difficulty?.key !== 'medium') {
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
          <Header
            handleNewGame={handleNewGame}
            wins={wins}
            difficulty={difficulty?.key as string}
            showHint={showHint}
            toggleHint={toggleHint}
            hintUsed={hintUsed}
          />
          {!gameOver && difficulty?.key === "extreme" && (
            <div className="timer">
              <h3 className="timer-header">
                Time Remaining:  <span className="seconds"> {timer} </span> seconds
              </h3>
            </div>
          )}
          {gameOver && difficulty?.key === "extreme" && (
            <div className="extreme-popup">
              <h2 className="extreme-warning">Game Over!</h2>
              <p className="extreme-text">You failed the EXTREME level.</p>
            </div>
          )}
          <div className={`grid ${difficulty?.key}`}>
            {cards.map((card) => {
              const { image, matched } = card;

              return (
                <Card
                  key={card.id}
                  image={image}
                  onClick={() => handleClick(card)}
                  selected={card === pickOne || card === pickTwo || matched}
                  className={gameOver && difficulty?.key === "extreme" ? "disabled" : ""}
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