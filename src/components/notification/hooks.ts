import { useEffect, useState } from 'react';
import initializeSocket from './sockets';

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
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return { count, notifications, loading };
};
