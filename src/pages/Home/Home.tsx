import { Badge } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { resetState } from "../../redux/indexCounterSlice";
import { resetTotalScore } from "../../redux/totalScoreSlice";
import styles from "./Home.module.scss";
const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetState())    
    dispatch(resetTotalScore())    
  }, [])
  return (
    <>
      <section id={styles.home}>
        <div className="container">
          <div className={styles.home}>
            <div className={styles["home-title"]}>
              <h1>
                Greetings, future physicists! It's time to put your skills to
                the test with this exciting quiz.
              </h1>
              <p>Please choose the test Version and Start</p>
            </div>
            <div className={styles["home-main"]}>
              <Badge.Ribbon text="Physics">
                <div className={styles["home-main-card"]}>
                  <h1>Version 1</h1>
                  <p>Difficulty: Medium</p>
                  <NavLink to={"/test/1"}>
                    <button>Start</button>
                  </NavLink>
                  <div className={styles["home-main-card-subtitle"]}>
                    <p>10 Questions</p>
                  </div>
                </div>
              </Badge.Ribbon>
              <Badge.Ribbon text="Physics">
                <div className={styles["home-main-card"]}>
                  <h1>Version 2</h1>
                  <p>Difficulty: Medium</p>
                  <NavLink to={"/test/2"}>
                    <button>Start</button>
                  </NavLink>
                  <div className={styles["home-main-card-subtitle"]}>
                    <p>10 Questions</p>
                  </div>
                </div>
              </Badge.Ribbon>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
