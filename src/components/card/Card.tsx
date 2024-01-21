import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaXmark, FaArrowRight } from "react-icons/fa6";

import { increase } from "../../redux/indexCounterSlice";
import { increaseTheScore } from "../../redux/totalScoreSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./Card.module.scss";
import { CardProps } from "../../const";

const Card: React.FC<CardProps> = ({ id, text, a, b, c, d, correctAnswer, numberOfQuestions }) => {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state: RootState) => state.counterSlice.value);
  const totalScore = useSelector((state: RootState) => state.totalScore.value)
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
  const nextButtonController = async() => {
    if (currentIndex === numberOfQuestions - 1) {
        localStorage.setItem('totalScore', totalScore.toString())
        localStorage.setItem('dataSaved', 'false')
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
            disabled={clickedButton !== null}
          >
            {renderIconForIncorrect("a")}
            {a}
          </button>
          <button
            onClick={() => checkAnswer("b")}
            className={getButtonClass("b")}
            disabled={clickedButton !== null}
          >
            {renderIconForIncorrect("b")}
            {b}
          </button>
          <button
            onClick={() => checkAnswer("c")}
            className={getButtonClass("c")}
            disabled={clickedButton !== null}
          >
            {renderIconForIncorrect("c")} {c}
          </button>
          <button
            onClick={() => checkAnswer("d")}
            className={getButtonClass("d")}
            disabled={clickedButton !== null}
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
