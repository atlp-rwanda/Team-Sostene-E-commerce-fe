import { Route, Routes } from 'react-router';
import Home from './pages/home/home';
import store from './redux/store';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Navigation from './components/navigation/nav';
import Accounts from './pages/accounts/Accounts';
import GoogleLoginSuccess from './pages/google/successLogin';
import About_us from './pages/about/about_us';

function App() {
  library.add(fab, fas);
  return (
    <div data-testid="app">
      <Provider store={store}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/accounts/*" element={<Accounts />}></Route>
          <Route
            path={`${import.meta.env.VITE_BACKEND_URL}/auth/google/success`}
            element={<GoogleLoginSuccess />}
          ></Route>
          <Route path="/about_us" element={<About_us />}></Route>
        </Routes>
      </Provider>

      <div></div>
    </div>
  );
}

export default App;
