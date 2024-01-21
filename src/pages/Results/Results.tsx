import { Progress, Table, TableColumnsType, TableProps, Tabs, TabsProps } from "antd";
import { useSelector } from "react-redux";
import { IoReload } from "react-icons/io5";
import { RootState } from "../../redux/store";
import styles from "./Results.module.scss";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { request, token } from "../../server/request";
import { Interface } from "readline";
import { DataType, User } from "../../const";
import UserCard from "../../components/userCard/UserCard";

const Results = () => {
  const [ userScore, setUserScore ] = useState<User[]>([]);
  const totalScore = useSelector((state: RootState) => state.totalScoreSlice.value)
    const totalPercentage = totalScore * 10 / 100
    const twoColors = { '0%': '#108ee9', '100%': '#87d068' };
    useEffect(() => {
      const fetchApi = async() => {
        try {
          let res = await request.get('TestResult/get-all', {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          setUserScore(res.data)          
        } catch (error) {
          console.log(error);
          
        }
      }
      fetchApi()
    }, [])
    const columns: TableColumnsType<DataType> = [
      {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Date',
        dataIndex: 'address',
      }
    ];
    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
      },
    ];


    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };


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
      children: (
        <div className="leaderboard">
          <div className="leaderboard-title">
            Our leaders
          </div>
          <div className="leaderboard-users">
          <Table columns={columns} dataSource={data} onChange={onChange}/>
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
