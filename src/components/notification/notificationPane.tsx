<<<<<<< HEAD
import styles from './pane.module.scss';
import { useNotifications } from './hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAllAsRead, useMarkAsRead } from './hooks';

export default function NotificationPane() {
  const { notifications, count, loading } = useNotifications();
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };
  const { markAll, isAllMarked } = useAllAsRead();
  const handleMarkAll = () => {
    markAll();
  };
  const { handleMark, isMarked } = useMarkAsRead();
  const handleClick = (id: string) => {
    return () => {
      handleMark(id);
    };
  };

  return (
    <div className={`absolute right-0 top-12 w-72 z-50`} data-testid="notifications-pane">
      {loading ? (
        <p className="p-3 bg-orange text-black w-72 flex justify-center items-center">
          <i className="fa fa-spinner fa-spin text-white" aria-hidden="true"></i>
        </p>
      ) : (
        <div>
          <div className={`bg-orange p-3 flex flex-row justify-between`}>
            <p className={styles.text}>
              {notifications.length} Notifications <b>({count})</b>
            </p>
            <div className={styles.btn_all}>
              <button onClick={handleMarkAll}>
                {isAllMarked.loading ? (
                  <FontAwesomeIcon icon="circle-notch" spin={true} />
                ) : (
                  <FontAwesomeIcon icon="check" className={`text-white`} />
                )}
              </button>
            </div>
          </div>
          <div className="p-1 flex flex-col h-64 overflow-scroll bg-white border border-translucent">
            {notifications.map((item) => (
              <div className="p-1 border-b border-translucent" key={item.notificationId}>
                <div className=" font-semibold">{item.title}</div>
                <div className="pl-1 border-l border-translucent my-1">{item.message}</div>
                <div className="w-full items-center flex flex-row justify-between">
                  <div className="text-gray text-xs italic">{formatDate(item.date)}</div>
                  {item.read ? (
                    ''
                  ) : (
                    <div className={styles.markOne}>
                      <button onClick={handleClick(item.notificationId)}>
                        {isMarked.loading ? (
                          <FontAwesomeIcon icon="circle-notch" spin={isMarked.loading} />
                        ) : (
                          <FontAwesomeIcon icon="check" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
=======
import styles from './pane.module.scss';
import { useNotifications } from './hooks';

export default function NotificationPane() {
  const { notifications, count, loading } = useNotifications();
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={`absolute right-0 top-12 w-72 z-50`} data-testid="notifications-pane">
      {loading ? (
        <p className="p-3 bg-orange text-black w-72 flex justify-center items-center">
          <i className="fa fa-spinner fa-spin text-white" aria-hidden="true"></i>
        </p>
      ) : (
        <>
          <div className={`bg-orange p-3`}>
            <p className={styles.text}>
              {notifications.length} Notifications <b>({count})</b>
            </p>
          </div>
          <div className="p-1 flex flex-col h-64 overflow-scroll bg-white border border-translucent">
            {notifications.map((item) => (
              <div className="p-1 border-b border-translucent" key={item.notificationId}>
                <div className=" font-semibold">{item.title}</div>
                <div className="pl-1 border-l border-translucent my-1">{item.message}</div>
                <div className="w-full items-center flex flex-row justify-between">
                  <div className="text-gray text-xs italic">{formatDate(item.date)}</div>
                  <div className="p-1">
                    <i className="fa fa-check text-orange" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
>>>>>>> A seller should be to update the product in case he/she needs to - ensures that user have the form to update their certain products -allow user to view a way to update an image displayed on product also Delivers #185172094]
