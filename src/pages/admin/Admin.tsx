import { Pagination, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LeaderBoardCard from "../../components/leaderboardCard/LeaderBoardCard";
import Loader from "../../components/loader/Loader";
import QuestionCard from "../../components/questionCard/QuestionCard";
import { Question, User } from "../../const";
import { request, token } from "../../server/request";
import styles from "./Admin.module.scss";

const Admin = () => {
  const { register, handleSubmit, reset } = useForm();
  const [ question, setQuestion ] = useState<Question[]>([]);
  const [ userScore, setUserScore ] = useState<User[]>([]);
  const [ totalQuestions, setTotalQuestions ] = useState<number>(0);
  const [ currentIndex, setCurrentIndex ] = useState<number>(1)
  const [ currentVersion, setCurrentVersion ] = useState<string>('3')
  const [ loading, setLoading ] = useState<Boolean>(false)
  const questionsPerPage = 5;
  const submit = async (data: any) => {
    try {
      // create question
      await request.post("Question/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      reset()
      toast.success("Successfully created", {
        position: "bottom-right",
        autoClose: 2000,
      });
      fetchApi()
    } catch (error) {
      console.log(error);
    }
  };
  const fetchApi = async () => {
    try {
      // get questions by version type
      let res = await request.get(`TestVariant/${currentVersion}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      
      setTotalQuestions(res.data.numberOfQuestions);
      setQuestion(res.data.questions)        
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserScore = async() => {
    try {
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
  useEffect(() => {
    try {
      setLoading(true)
      fetchApi();
      fetchUserScore()
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }, [currentVersion]);
  const currentIndexController = (newPagination: number) => {
    setCurrentIndex(newPagination)
  }
  const currentVersionController = (versionNumber: string) => {
    setCurrentVersion(versionNumber)
  }
  
  const startIndex = (currentIndex - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const dataSlicer = question?.slice(startIndex, endIndex);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Create",
      children: (
        <>
          <div className={styles["admin-create-title"]}>
            <h1>Create Your Question</h1>
          </div>
          <div className={styles.form}>
            <form onSubmit={handleSubmit(submit)}>
              <textarea
                placeholder="Write Your Question"
                {...register("Text", { required: true })}
                required
              />
              <div className={styles["form-options"]}>
                <label>
                  Option A:
                  <input
                    placeholder="Option A"
                    {...register("A", { required: true })}
                    required
                  />
                </label>
                <label>
                  Option B:
                  <input
                    placeholder="Option B"
                    {...register("B", { required: true })}
                    required
                  />
                </label>
                <label>
                  Option C:
                  <input
                    placeholder="Option C"
                    {...register("C", { required: true })}
                    required
                  />
                </label>
                <label>
                  Option D:
                  <input
                    placeholder="Option D"
                    {...register("D", { required: true })}
                    required
                  />
                </label>
              </div>
              <div className={styles["form-button"]}>
                <div className={styles["form-select"]}>
                  <select
                    id=""
                    defaultValue={""}
                    {...register("CorrectAnswer", { required: true })}
                    required
                  >
                    <option value="" disabled>
                      Correct Answer
                    </option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                    <option value="d">D</option>
                  </select>
                  <select
                    id=""
                    defaultValue={""}
                    {...register("TestVariantId", { required: true })}
                    required
                  >
                    <option value="" disabled>
                      Version Type
                    </option>
                    <option value="3">Version 1</option>
                    <option value="4">Version 2</option>
                  </select>
                </div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Questions",
      children: (
        <>
          <div className={styles['questions']}>
            <div className={styles['questions-title']}>
              <p>Total Questions: {totalQuestions}</p>
              <select onChange={(e) => currentVersionController(e.target.value)}>
                <option value="3">Version 1</option>
                <option value="4">Version 2</option>
              </select>
            </div>
            {dataSlicer?.map(card => (
              <QuestionCard key={card?.id} {...card} onDelete={fetchApi} />
            ))}
            <Pagination
              defaultCurrent={currentIndex} 
              onChange={currentIndexController} 
              total={totalQuestions}
              pageSize={questionsPerPage} />
          </div>
        </>
      )
    },
    { 
      key: "3",
      label: "LeaderBoard",
      children: (
        <div className="leaderboard">
          {userScore?.slice((currentIndex - 1) * questionsPerPage, currentIndex * questionsPerPage).map(card => (
            <LeaderBoardCard key={card?.id} {...card} onDelete={fetchUserScore} />
          ))}
          <Pagination
            current={currentIndex}
            onChange={currentIndexController}
            total={userScore.length}
            pageSize={questionsPerPage}
            className={styles['leaderboard-pagination']}
          />
        </div>
      )  
      }
  ];
  if (loading) {
    return <Loader />
  }
  return (
    <section id={styles.admin}>
      <div className="container">
        <div className={styles.admin}>
          <Tabs
            defaultActiveKey="1"
            items={items}
            className={styles["results-tabs"]}
          />
        </div>
      </div>
    </section>
  );
};

export default Admin;
