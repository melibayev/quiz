import { useEffect, useState } from "react";
import { Progress, Table, TableColumnsType, TableProps, Tabs, TabsProps } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoReload } from "react-icons/io5";
import { RootState } from "../../redux/store";
import { resetTotalScore } from "../../redux/totalScoreSlice";
import { resetState } from "../../redux/indexCounterSlice";
import { request, token } from "../../server/request";
import { DataType, User } from "../../const";
import UserCard from "../../components/userCard/UserCard";
import styles from "./Results.module.scss";

const Results = () => {
  const [ userScore, setUserScore ] = useState<User[]>([]);
  const totalScore = useSelector((state: RootState) => state.totalScoreSlice.value)
  const twoColors = { '0%': '#108ee9', '100%': '#87d068' };
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const score = localStorage.getItem('totalScore')
  const scorePercentage = Number(score)
  const dataSaved = localStorage.getItem('dataSaved') === 'true'
  
  
  
  useEffect(() => {
      const fetchApi = async() => {
        const variantId = localStorage.getItem('variantId')
        const saveResults = {TotalScore: Number(score), TestVariantId: Number(variantId) }        
        try {
          // Save The user Results
          if (!dataSaved && score && variantId) {
            await request.post('TestResult/save-result/', saveResults, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              }
            })
          }
          localStorage.setItem('dataSaved', 'true');

          // Getting results of all users
          let res = await request.get('TestResult/get-all', {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          const formattedData = res.data.map((item: any) => {
            return {
              ...item,
              solvedAt: new Date(item.solvedAt).toLocaleDateString('en-GB'),
            };
          });
          setUserScore(formattedData)          
        } catch (error) {
          console.log(error);  
        }
      }
      fetchApi()
    }, [])
    const restartTheTest = () => {
      dispatch(resetTotalScore())
      dispatch(resetState())
      navigate('/')
    }

    const columns: TableColumnsType<DataType> = [
      {
        title: 'Username',
        dataIndex: 'username',
        sorter: (a, b) => a.username.length - b.username.length,
      },
      {
        title: 'Date',
        dataIndex: 'solvedAt',
        defaultSortOrder: 'descend',
      },
      {
        title: 'Score',
        dataIndex: 'totalScore',
        sorter: (a, b) => b.totalScore - a.totalScore,
        defaultSortOrder: 'ascend'
      }
    ];

    const items: TabsProps["items"] = [
    {
      key: "1",
      label: "My Score",
      children: (
        <>
        <h1 className={styles['results-info']}>Your test result</h1>
        <Progress type="circle" percent={scorePercentage > 0 ? scorePercentage * 10 / 100 : 0} strokeColor={twoColors} />,
        <p className={styles['results-score']}>{scorePercentage / 100} / {10}</p>
        <p className={styles['results-congrats']}>Congrats!</p>
        <div className={styles['results-play-again']}>
           <button onClick={restartTheTest}><IoReload /> Play Again</button>
        </div>
        </>
      )
    },
    {
      key: "2",
      label: "Leaderboard",
      children: (
        <div className="leaderboard">
          <div className="leaderboard-title">
            Our leaders
          </div>
          <div className="leaderboard-users">
          <Table columns={columns} dataSource={userScore} pagination={{pageSize: 5}} className={styles['results-table']}/>
          </div>
        </div>
      )
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
