import { Dropdown, MenuProps } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { User } from "../../const";
import { request, token } from "../../server/request";
import styles from './LeaderBoardCard.module.scss'

interface LeaderboardCardProps extends User {
  onDelete: () => void;
}
const LeaderBoardCard: React.FC<LeaderboardCardProps> = ({ id, username, userId, solvedAt, totalScore, onDelete }) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p className={styles['card-delete']} onClick={() => deleteUserScore(id, onDelete)}>Delete</p> 
     ),
    },
  ];
  
  const deleteUserScore = async(deleteId: number, onDelete: () => void) => {
    
    try {
        await request.delete(`TestResult/${deleteId}/delete`, {
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
      <div className={styles['card-user-info']}>
        <p>Username <span>{username}</span></p>
      </div>
      <div className={styles['card-time-info']}>
        <p>Solved at:<span>{solvedAt}</span></p>
      </div>
      <div className={styles['card-score-info']}>
        <p>score: <span>{totalScore}</span></p>
        <Dropdown menu={{items}}>
          <AiOutlineDelete />
        </Dropdown>

      </div>
    </div>
  )
}

export default LeaderBoardCard