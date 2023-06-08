import ReactDOM from 'react-dom/client';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
    <App />
  </PersistGate>
);
