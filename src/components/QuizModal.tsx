import { useState } from "react";
import { quizQuestions } from "../data/quizQuestions";

type QuizModalProps = {
  setAnswer: (id: number) => void;
  currentQuestionIndex: number;
};

const QuizModal: React.FC<QuizModalProps> = ({ setAnswer, currentQuestionIndex }) => {
  const [userAnswer, setUserAnswer] = useState<number>(-1);
  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswer = () => {
    if (userAnswer !== null) {
      setAnswer(userAnswer);
      setUserAnswer(-1);
    }
  };

  const handleOptionClick = (selectedAnswerIndex: number) => {
    setUserAnswer(selectedAnswerIndex);
    console.log(selectedAnswerIndex);
  };

  return (
    <div className="quizzle-modal">
      {currentQuestionIndex < quizQuestions.length ? (
        <>
          <h2>{currentQuestion.question}</h2>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleOptionClick(index)}
                  disabled={userAnswer !== -1}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          {userAnswer !== null && (
            <button onClick={handleAnswer}>Submit Answer</button>
          )}
        </>
      ) : (
        <h2>Quiz Completed!</h2>
      )}
    </div>
  );
};

export default QuizModal;