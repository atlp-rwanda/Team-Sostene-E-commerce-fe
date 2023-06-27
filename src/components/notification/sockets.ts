import store from '../../redux/store';
import { io, Socket } from 'socket.io-client';

const initializeSocket = (): Socket => {
  const token = store.getState().token.value;
  const socket: Socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
    query: { authToken: token },
    path: '/socket.io/socket.io.js',
    transports: ['websocket'],
    secure: true,
  });

  socket.on('unauthorized', (alerting) => {
    alert(`Login First ${alerting}`);
  });

  return socket;
};

export default initializeSocket;
