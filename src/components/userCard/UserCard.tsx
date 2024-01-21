import styles from './UserCard.module.scss'

const UserCard = () => {
  return (
    <div className={styles.card}>
        <div className={styles['card-img']}>
            <img src="https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png" alt="" />
            <div className={styles['card-info-username']}>
                falonchi otildiyev
            </div>
        </div>
        <div className={styles['card-info']}>
            
            <div className={styles['card-info-score']}>
                500
            </div>
        </div>
    </div>
  )
}

export default UserCard