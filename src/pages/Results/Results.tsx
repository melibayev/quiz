import { Progress, Tabs, TabsProps } from "antd";
import { useSelector } from "react-redux";
import { IoReload } from "react-icons/io5";
import { RootState } from "../../redux/store";
import styles from "./Results.module.scss";
import { NavLink } from "react-router-dom";
const Results = () => {
  const totalScore = useSelector((state: RootState) => state.totalScoreSlice.value)
    const totalPercentage = totalScore * 10 / 100
    const twoColors = { '0%': '#108ee9', '100%': '#87d068' };
    const items: TabsProps["items"] = [
    {
      key: "1",
      label: "My Score",
      children: (
        <>
        <h1 className={styles['results-info']}>Your test result</h1>
        <Progress type="circle" percent={totalPercentage} strokeColor={twoColors} />,
        <p className={styles['results-score']}>{totalScore / 100} / {10}</p>
        <p className={styles['results-congrats']}>Congratulations!</p>
        <div className={styles['results-play-again']}>
            <NavLink to={'/'}><button><IoReload /> Play Again</button></NavLink>
        </div>
        </>
      )
        
    },
    {
      key: "2",
      label: "Leaderboard",
    },
  ];
  return (
    <>
    <section id={styles.results}>
        <div className="container">
            <div className={styles.results}>
                <Tabs defaultActiveKey="1" items={items} className={styles['results-tabs']}/>
                
            </div>
        </div>
    </section>
    </>
  );
};

export default Results;
