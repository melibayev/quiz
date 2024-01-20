import React, { useState } from "react";

import { increase } from "../../redux/indexCounterSlice";
import { increaseTheScore } from "../../redux/totalScoreSlice";
import styles from "./Card.module.scss";
import { FaXmark, FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: number;
  text: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correctAnswer: string;
  numberOfQuestions: number;
}

const Card: React.FC<CardProps> = ({ id, text, a, b, c, d, correctAnswer, numberOfQuestions }) => {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state: RootState) => state.counterSlice.value);
  const totalScore = useSelector((state: RootState) => state.totalScoreSlice.value)
  const navigate = useNavigate()
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [clickedButton, setClickedButton] = useState<string | null>(null);
  const checkAnswer = (answer: string) => {
    setClickedButton(answer);
    if (answer === correctAnswer.toLowerCase()) {
      setIsCorrect(true);
      dispatch(increaseTheScore()) 
    }
  };
  
  const getButtonClass = (option: string) => {
    if (clickedButton === option) {
      return isCorrect ? styles.correct : styles.incorrect;
    }
  };
  const renderIconForIncorrect = (option: string) => {
    if (!isCorrect && clickedButton === option) {
      return (
        <p>
          <FaXmark />
        </p>
      );
    }
    return null;
  };
  const nextButtonController = () => {
    if (currentIndex === numberOfQuestions - 1) {
        navigate('/results')
    } else {
        dispatch(increase())
    }
  }

  return (
    <div className={styles["card"]}>
      <div className={styles["card-top"]}>
        <div className={styles["card-top-title"]}>Physics Test</div>
        <div className={styles["card-top-score"]}>
          <p>{currentIndex + 1} of {numberOfQuestions}</p>
          <p className={isCorrect ? styles["green"] : ""}>
            Score: {totalScore}
          </p>
        </div>
      </div>
      <div className={styles["card-info"]}>
        <div className={styles["card-info-question"]}>
          <p>{text}</p>
        </div>
        <div className={styles["card-info-btns"]}>
          <button
            onClick={() => checkAnswer("a")}
            className={getButtonClass("a")}
            disabled={isCorrect !== null}
          >
            {renderIconForIncorrect("a")}
            {a}
          </button>
          <button
            onClick={() => checkAnswer("b")}
            className={getButtonClass("b")}
            disabled={isCorrect !== null}
          >
            {renderIconForIncorrect("b")}
            {b}
          </button>
          <button
            onClick={() => checkAnswer("c")}
            className={getButtonClass("c")}
            disabled={isCorrect !== null}
          >
            {renderIconForIncorrect("c")} {c}
          </button>
          <button
            onClick={() => checkAnswer("d")}
            className={getButtonClass("d")}
            disabled={isCorrect !== null}
          >
            {renderIconForIncorrect("d")} {d}
          </button>
        </div>
        <div className={styles["card-info-next-button"]}>
          {clickedButton ? (
            <button onClick={nextButtonController}>
              {currentIndex + 1 !== numberOfQuestions ? "Next" : 'See the results' } <FaArrowRight />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
