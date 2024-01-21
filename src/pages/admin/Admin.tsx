import { Pagination, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import QuestionCard from "../../components/questionCard/QuestionCard";
import { Question } from "../../const";
import { request, token } from "../../server/request";
import styles from "./Admin.module.scss";

const Admin = () => {
  const { register, handleSubmit, reset } = useForm();
  const [ question, setQuestion ] = useState<Question[]>([]);
  const [ totalQuestions, setTotalQuestions ] = useState<number>(0);
  const [ currentIndex, setCurrentIndex ] = useState<number>(1)
  const [ currentVersion, setCurrentVersion ] = useState<string>('1')
  const questionsPerPage = 5;
  const submit = async (data: any) => {
    try {
      let res = await request.post("Question/create", data, {
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
  useEffect(() => {
    fetchApi();
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
                    <option value="1">Version 1</option>
                    <option value="2">Version 2</option>
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
                <option value="1">Version 1</option>
                <option value="2">Version 2</option>
              </select>
            </div>
            {dataSlicer?.map(card => (
              <QuestionCard key={card.id} {...card} onDelete={fetchApi} />
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
        <div className="leaderborard">
          
        </div>
      )  
      }
  ];
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