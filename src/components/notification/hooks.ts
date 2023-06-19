import { useEffect, useState } from 'react';
import initializeSocket from './sockets';
import NOTIFICATIONS from './notificationPane';
import { markOneAsRead } from './redux/markOneAsReadSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { markAllAsRead } from './redux/markAllAsReadSlice';

type NOTIFICATIONS = {
  id: string;
  notificationId: string;
  title: string;
  message: string;
  read: boolean;
  level: string;
  date: string;
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<NOTIFICATIONS[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const markOneAsRead = useAppSelector((state) => state.markOneNotification);
  const markAllAsRead = useAppSelector((state) => state.markAllNotificationsAsRead);

  useEffect(() => {
    setLoading(true);
    const socket = initializeSocket();
    socket.emit('join');
    socket.on('joined', (data) => {
      socket.emit('all-notifications', data);
    });
    socket.on('notification', (not: NOTIFICATIONS) => {
      setCount((prev) => prev + 1);
      setNotifications((prev) => {
        prev[prev.length] = not;
        prev.reverse();
        return prev;
      });
    });
    socket.on('my-notifications', (nots: NOTIFICATIONS[]) => {
      const m = nots.filter((item: { read: boolean }) => item.read === false);
      setCount(m.length);
      setNotifications(() => nots.reverse());
      setLoading(false);
      setNotifications(() => m.reverse());
    });
    return () => {
      socket.disconnect();
    };
  }, [markOneAsRead, markAllAsRead]);

  return { count, notifications, loading };
};
export const useMarkAsRead = () => {
  const isMarked = useAppSelector((state) => state.markOneNotification);
  const dispatch = useAppDispatch();

  const handleMark = (id: string) => {
    dispatch(markOneAsRead(id));
  };

  return {
    isMarked,
    handleMark,
  };
};
export const useAllAsRead = () => {
  const isAllMarked = useAppSelector((state) => state.markAllNotificationsAsRead);
  const dispatch = useAppDispatch();
  const markAll = () => {
    dispatch(markAllAsRead());
  };
  return {
    isAllMarked,
    markAll,
  };
};
