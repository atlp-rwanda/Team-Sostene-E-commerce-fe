import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import '../styles/globals.scss';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
