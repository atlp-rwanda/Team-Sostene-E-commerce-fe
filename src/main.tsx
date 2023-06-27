import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/index.css';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
      <App />
    </PersistGate>
  </BrowserRouter>
);
