import { useState, useEffect, useMemo, useCallback } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import DifficultyModal from './components/DifficultyModal';
import CategoryModal from './components/CategoryModal';
import ObstaclesModal from './components/ObstacleModal';
import QuizModal from './components/QuizModal';

import shuffle from './utilities/shuffle';
import useAppBadge from './hooks/useAppBadge';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'

import { CardType } from './types/cardType';
import { DifficultyType } from './types/difficultyType';
import { CategoryType } from './types/categoryType';
import { ObstacleType } from './types/obstacleType';
import { Timer } from './types/timerType';

import { quizQuestions } from './data/quizQuestions';
import { categories } from './data/categories';
import { obstacles } from './data/obstacles';
import { QuizQuestion } from './types/quizQuestionType';

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
  const [obstacle, setObstacle] = useState<ObstacleType | null>(null);
  const [showObstacleModal, setShowObstacleModal] = useState<boolean>(false);
  const [obstacleChosen, setObstacleChosen] = useState<boolean>(false);

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [quizQuantity, setQuizQuantity] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<number>(-1);
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);

  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintUsed, setHintUsed] = useState<boolean>(false);
  const [randomIndices, setRandomIndices] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);

  const [nukePair, setNukePair] = useState<CardType | null>(null);

  const [cardFlipAudio] = useState<HTMLAudioElement>(cardFlip);
  const [easyMediumBackgroundAudio] = useState<HTMLAudioElement>(easyMediumBackground);
  const [hardExtremeBackgroundAudio] = useState<HTMLAudioElement>(hardExtremeBackground);

  const difficulties: Record<string, DifficultyType> = useMemo(
    () => ({
      easy: { key: 'easy', cardsCount: 12 },
      medium: { key: 'medium', cardsCount: 16 },
      hard: { key: 'hard', cardsCount: 20 },
      extreme: { key: 'extreme', cardsCount: 20 },
      obstacles: { key: 'obstacles', cardsCount: 20 },      
    }),
    []
  );

  const [setBadge, clearBadge] = useAppBadge();

  const handleClick = useCallback(
    (card: CardType) => {
      if (gameOver || showQuizModal) {
        return;
      }
  
      if (!disabled) {
        if (
          difficulty?.key === "obstacles" &&
          obstacle === "Time Bomb" &&
          !pickOne
        ) {
          setMistakes((prevMistakes) => prevMistakes + 1);
        }
          
        if (difficulty?.key === "obstacles" && obstacle === "Nuke") {
          if (nukePair === null) {
            console.log("Moxda 1");
            
            const randomIndex = Math.floor(Math.random() * cards.length);
            const randomCard = cards[randomIndex];
  
            setNukePair({ ...randomCard, id: Math.random(), matched: false });
          }
          console.log(nukePair);
        }
  
        pickOne ? setPickTwo(card) : setPickOne(card);
        cardFlipAudio.play();
      }
    },
    [gameOver, showQuizModal, disabled, difficulty?.key, obstacle, pickOne, cardFlipAudio, nukePair, cards]
  );
  
  const handleTimer = useCallback(() => {
    setTimer((prevTimer) => prevTimer - 1);
  }, []);

  const handleTurn = useCallback(() => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
    setShowHint(false);
  
    if (
      difficulty?.key === "obstacles" &&
      obstacle === "Time Bomb" &&
      (mistakes + 1) % 3 === 0
    ) {
      setTimer((prevTimer) => prevTimer - 3);
    }
  
    if (
      difficulty?.key === "obstacles" &&
      obstacle === "Nuke" &&
      nukePair &&
      pickOne &&
      pickTwo &&
      pickOne.image === pickTwo.image &&
      pickOne.image === nukePair.image
    ) {
      const unmatchedPairs = cards.filter((card) => !card.matched);
      console.log(unmatchedPairs);
      
      const isLastPair = unmatchedPairs.length === 2 && unmatchedPairs[0].id === unmatchedPairs[1].id;
      
      if (!isLastPair) {
        console.log("Moxda");
        
        setTimer((prevTimer) => prevTimer / 2);
      }
    }
  }, [difficulty?.key, obstacle, mistakes, nukePair, pickOne, pickTwo, cards]);     

  const handleNewGame = useCallback(() => {
    setWins(0);
    setDifficulty(null);
    setCategory(null);
    setShowCategoryModal(true);
    setShowDifficultyModal(true);
    setShowObstacleModal(false);
    setShowQuizModal(false);
    setQuizQuantity(0);
    setCards([]);
    setShowHint(true);
    setHintUsed(false);
    handleTurn();
    setTimer(60);
    setGameOver(false);
    clearBadge();
    setObstacleChosen(false);
    easyMediumBackgroundAudio.pause();
    easyMediumBackgroundAudio.currentTime = 0;
    hardExtremeBackgroundAudio.pause();
    hardExtremeBackgroundAudio.currentTime = 0;
  }, [handleTurn, clearBadge, easyMediumBackgroundAudio, hardExtremeBackgroundAudio]);

  const handleDifficultyChange = useCallback((newDifficulty: DifficultyType) => {
    setDifficulty(newDifficulty);
    setShowDifficultyModal(false);
  
    if (newDifficulty.key === "extreme") {
      setTimer(60);
      setGameOver(false);
    }
  
    if (newDifficulty.key === "obstacles") {
      setTimer(90);
      setGameOver(false);
      setShowObstacleModal(true);
    }
  }, []);

  const handleCategoryChange = useCallback((newCategory: CategoryType) => {
    setCategory(newCategory);
    setShowCategoryModal(false);
  }, []);

  const handleObstacleChange = useCallback((newObstacle: ObstacleType) => {
    setObstacle(newObstacle);
    setShowObstacleModal(false);
    setObstacleChosen(true);
  }, []);

  const handleAnswerCheck = useCallback(() => {
    if (quizQuestions[currentQuestion].correctAnswer === userAnswer) {
      setTimer((prevTimer) => prevTimer + 15);
      setUserAnswer(-1);
      setShowQuizModal(false);
    } else {
      setTimer((prevTimer) => Math.max(0, prevTimer - 15));
      setUserAnswer(-1);
      setShowQuizModal(false);
    }
    setShowQuizModal(false);
    setUserAnswer(-1);
  }, [currentQuestion, userAnswer]);

  const toggleHint = useCallback(() => {
    if (!hintUsed) {
      setShowHint((prevShowHint) => !prevShowHint);
      setHintUsed(true);
    }
  }, [hintUsed]);

  const generateRandomIndices = (range: number, count: number) => {
    const randomIndices: number[] = [];
    
    while (randomIndices.length < count) {
      const randomIndex = Math.floor(Math.random() * range);
      
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    
    return randomIndices;
  };

  const getRandomQuestionByCategory = useCallback((category: CategoryType) => {
    const categoryQuestions = quizQuestions.filter((question) => question.category === category);
    const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
    return getIndexByField(quizQuestions, "question", categoryQuestions[randomIndex].question);
  }, []);

  const getIndexByField = (array: QuizQuestion[], field: string, fieldValue: string) => {
    return array.findIndex((element: QuizQuestion) => element[field] === fieldValue);
  };

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
    let intervalId: Timer | undefined;
  
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
  
    if (difficulty?.key === "obstacles" && obstacleChosen && !gameOver) {
      if (quizQuantity === 0 && timer <= 45 && obstacle === "Quizzle" && userAnswer === -1) {
        setShowQuizModal(true);
        if (category) {
          const randomQuestion = getRandomQuestionByCategory(category);
          setCurrentQuestion(randomQuestion);
        } else {
          setCurrentQuestion(Math.floor(Math.random() * quizQuestions.length));
        }
        setQuizQuantity((quizQuantity) => quizQuantity + 1);
        clearInterval(intervalId);
      } else {
        if (userAnswer !== -1) {
          handleAnswerCheck();
        }
  
        intervalId = setInterval(() => {
          if (timer > 0 && !showQuizModal) {
            handleTimer();
          } else if (showQuizModal) {
            clearInterval(intervalId);
          } else if (timer <= 0) {
            setGameOver(true);
          }
        }, 1000);
      }
    }
  
    return () => {
      clearInterval(intervalId);
    };
  }, [difficulty, gameOver, handleTimer, timer, obstacle, obstacleChosen, userAnswer, handleAnswerCheck, quizQuantity, showQuizModal, category, getRandomQuestionByCategory]);  
  
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

  useEffect(() => {
    if (category && difficulty?.key === "obstacles" && obstacleChosen && obstacle === "Blindfold") {
      const generatedIndices = generateRandomIndices(cards.length, 4);
      setRandomIndices(generatedIndices);
    }
  }, [category, difficulty, obstacleChosen, obstacle, cards.length]);  

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
          {category && difficulty?.key === "obstacles" && showObstacleModal && (
            <ObstaclesModal obstacles={obstacles} onObstacleChange={handleObstacleChange} />
          )}
          {!gameOver && (difficulty?.key === "extreme" || (difficulty?.key === "obstacles" && obstacleChosen)) && (
            <div className="timer">
              <h3 className="timer-header">
                Time Remaining: <span className="seconds"> {timer} </span> seconds
              </h3>
            </div>
          )}
          {gameOver && (difficulty?.key === "extreme" || (difficulty?.key === "obstacles"))  && (
            <div className="extreme-popup">
              <h2 className="extreme-warning">Game Over!</h2>
              <p className="extreme-text">You failed the EXTREME level.</p>
            </div>
          )}
          {showQuizModal && <QuizModal setAnswer={setUserAnswer} currentQuestionIndex={currentQuestion} />}
          {category && difficulty?.key === "obstacles" && obstacleChosen && (
            <div className={`grid ${difficulty?.key}`}>
              {cards.map((card, index: number) => {
                const { image, matched } = card;

                return (
                  <Card
                    key={card.id}
                    image={image}
                    onClick={() => handleClick(card)}
                    selected={card === pickOne || card === pickTwo || matched}
                    blindfolded={randomIndices.includes(index)}
                  />
                );                  
              })}
            </div>
          )}
          {category && difficulty?.key !== "obstacles" && (
            <div className={`grid ${difficulty?.key}`}>
              {cards.map((card) => {
                const { image, matched } = card;
  
                return (
                  <Card
                    key={card.id}
                    image={image}
                    onClick={() => handleClick(card)}
                    selected={card === pickOne || card === pickTwo || matched}
                    blindfolded={false}
                  />
                );
              })}
            </div>
          )}
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