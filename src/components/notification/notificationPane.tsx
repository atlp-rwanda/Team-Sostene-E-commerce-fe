import styles from './pane.module.scss';
import { useNotifications } from './hooks';

export default function NotificationPane() {
  const { notifications, count } = useNotifications();
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={styles.pane_container} data-testid="notifications-pane">
      <div className={`${styles.title} py-3`}>
        <p className={styles.text}>
          {notifications.length} Notifications <b>({count})</b>
        </p>
      </div>
      <div className={styles.container}>
        {notifications.map((item) => (
          <div className={item.read ? styles.not : styles.not_read} key={item.notificationId}>
            <div className={styles.title_2}>{item.title}</div>
            <div className={styles.texts}>{item.message}</div>
            <div className={styles.bottom}>
              <div className={styles.date}>{formatDate(item.date)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
