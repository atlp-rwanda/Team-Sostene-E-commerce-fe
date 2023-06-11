import styles from './icon.module.scss';
import { useNotifications } from './hooks';
import { ToastContainer } from 'react-toastify';

export default function Icon() {
  const { count } = useNotifications();
  return (
    <div data-testid="notification-bell" className="p-2">
      <div className={styles.container}>
        <i className="fa fa-bell" aria-hidden="true"></i>
        {count ? (
          <p className=" bg-orange rounded-full top-0 absolute ml-3 mt-2 w-4 h-4 flex items-center justify-center text-xs">
            {count}
          </p>
        ) : (
          ''
        )}
        <ToastContainer />
      </div>
    </div>
  );
}
