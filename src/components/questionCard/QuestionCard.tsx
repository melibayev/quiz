import { Dropdown, MenuProps } from 'antd'
import { AiOutlineDelete } from "react-icons/ai";
import styles from './QuestionCard.module.scss'
import { CardProps } from '../../const';
import { request } from '../../server/request';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface QuestionCardProps extends CardProps {
    onDelete: () => void;
}
const QuestionCard: React.FC<QuestionCardProps> = ({ id, text, a, b, c, d, correctAnswer, numberOfQuestions, onDelete }) => {
  const token = useSelector((state: RootState) => state.authorizationSetting.token);

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <p className={styles['card-settings-delete']} onClick={() => deleteQuestion(id, onDelete)}>Delete</p> 
         ),
        },
      ];
    const deleteQuestion = async(questionId: number, onDelete: () => void) => {
        try {
            await request.delete(`Question/${questionId}/delete`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  },
            });
            toast.success("Successfully deleted", {
                position: "bottom-right",
                autoClose: 2000,
            });
            onDelete();
        } catch (error) {
            console.log(error);
        }
    };
    return (
    <div className={styles.card}>
        <div className={styles['card-info']}>
            <p>{text}</p>
        </div>
        <div className={styles['card-answers']}>
            <p>A: {a}</p>
            <p>B: {b}</p>
            <p>C: {c}</p>
            <p>D: {d}</p>
            <p className={styles['card-answers-correct-answer']}>Correct Answer: {correctAnswer.toUpperCase()}</p>
        </div>
        <div className={styles['card-settings']}>
            <Dropdown menu={{items}}>
                <p onClick={(e) => e.preventDefault()}>
                    <AiOutlineDelete/>
                </p>
            </Dropdown>
        </div>
    </div>
  )
}

export default QuestionCard