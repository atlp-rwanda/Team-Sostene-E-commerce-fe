/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import store from '../../redux/store';
import { toast } from 'react-toastify';

function extended(socket: any) {
  socket.emit('join');
  socket.on('joined', (data: any) => {
    socket.emit('all-notifications', data);
  });
}

export const useNotifications = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const token = store.getState().token.value;
    const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
      query: { authToken: token },
      path: '/socket.io/socket.io.js',
      transports: ['websocket'],
      secure: true,
    });
    extended(socket);
    socket.on('my-notifications', (nots) => {
      setCount(nots.filter((item: { read: boolean }) => item.read === false).length);
    });
    socket.on('notification', (not) => {
      setCount((prev) => prev + 1);
      toast.info(not.title);
    });
    return () => {
      socket.disconnect();
    };
  }, [count]);

  return { count };
};
