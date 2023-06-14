import styles from './icon.module.scss';
import { useNotifications } from './hooks';
import { ToastContainer } from 'react-toastify';
import NotificationPane from './notificationPane';
import { useState } from 'react';

export default function Icon(props: { onClick: () => void }) {
  const { count } = useNotifications();
  const [view, setView] = useState(false);
  const handleView = () => {
    props.onClick();
    setView((prev: boolean) => !prev);
  };
  return (
    <div data-testid="notification-bell" className="p-2">
      <div className={styles.container}>
        <i
          className="fa fa-bell"
          aria-hidden="true"
          onClick={handleView}
          aria-label="notification-icon"
        ></i>
        {count ? (
          <p className=" bg-orange rounded-full top-0 absolute ml-3 mt-2 w-4 h-4 flex items-center justify-center text-xs">
            {count}
          </p>
        ) : (
          ''
        )}
        <ToastContainer />
        {view ? <NotificationPane /> : null}
      </div>
    </div>
  );
}
