import styles from './icon.module.scss';
import { useNotifications } from './hooks';
import NotificationPane from './notificationPane';
import { useState } from 'react';

export default function Icon() {
  const { count } = useNotifications();
  const [viewNotification, setviewNotification] = useState(false);
  const handleView = () => {
    setviewNotification((prev: boolean) => !prev);
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
          <div className=" bg-orange rounded-full top-0 absolute ml-3 mt-2 w-4 h-4 flex items-center justify-center text-xs">
            {count}
          </div>
        ) : (
          ''
        )}

        {viewNotification ? (
          <>
            <NotificationPane />
            <div
              className=" z-40 w-screen h-screen absolute left-0 top-0 bottom-0"
              onClick={() => setviewNotification(false)}
            ></div>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
