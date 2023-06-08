import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import store from './redux/store';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Accounts from './pages/accounts/Accounts';
import GoogleLoginSuccess from './pages/google/successLogin';
import About_us from './pages/about/about_us';
import Seller from './components/seller/seller';
import routes from './utils/routes';

function App() {
  library.add(fab, fas);
  return (
    <div data-testid="app">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route
              path={`${import.meta.env.VITE_BACKEND_URL}/auth/google/success`}
              element={<GoogleLoginSuccess />}
            ></Route>
            <Route path={routes.authenticate} element={<Accounts />}></Route>
            <Route path={routes.signup} element={<Accounts />}></Route>
            <Route path={routes.home} element={<Home />}></Route>
            <Route path={routes.login} element={<Accounts />}></Route>
            <Route path={routes.sellerListItems} element={<Seller />}></Route>
            <Route path={routes.about} element={<About_us />}></Route>
          </Routes>
        </Router>
      </Provider>
      <div></div>
    </div>
  );
}

export default App;
