import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { request, token } from "../../server/request";
import Card from "../../components/card/Card";
import { RootState } from "../../redux/store";
import { Question } from "../../const";
import styles from "./Test.module.scss";
import { useParams } from "react-router-dom";

const Test = () => {
  const [question, setQuestion] = useState<Question[]>([]);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const currentIndex = useSelector(
    (state: RootState) => state.counterSlice.value
  );
  const { id } = useParams<{ id: any }>();
  
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await request.get(`TestVariant/${id}/get-questions/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.setItem('variantId', id)
        setTotalQuestions(res.data.numberOfQuestions);
        setQuestion(res.data.questions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);
  const currentData = question[currentIndex];

  return (
    <section id={styles.test}>
      <div className="container">
        <div className={styles.test}>
          <Card
            key={currentData?.id}
            {...currentData}
            numberOfQuestions={totalQuestions}
          />
        </div>
      </div>
    </section>
  );
};

export default Test;
