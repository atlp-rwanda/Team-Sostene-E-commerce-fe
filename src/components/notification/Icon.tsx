import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './icon.module.scss';
import { useNotifications } from './hooks';
import { ToastContainer } from 'react-toastify';

export default function Icon() {
  const { count } = useNotifications();
  return (
    <div data-testid="notification-bell" className={styles.noti_icon}>
      <div className={styles.container}>
        <FontAwesomeIcon icon="bell" />
        {count ? <p className={styles.noti_number}>{count}</p> : ''}
        <ToastContainer />
      </div>
    </div>
  );
}
