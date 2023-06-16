import { Routes, Route } from 'react-router-dom';
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
import Navigation from './components/navigation/nav';
import { isLoggedIn } from './helpers/auth';
import Page404 from './pages/page404/page404';
import AssignRole from './pages/role/AssignRole';
import '../styles/index.css';
import Changepassword from './pages/accounts/editAccount/changepass';
import Contact from './pages/contact/contact';
import Footer from './pages/Footer/Footer';
import ViewCart from './pages/viewCart/Cart';
import ProductPage from './pages/product/Product';
import Dashboard from './pages/dashboard/Dashboard';
import { SellerComponent } from './components/roles/Protected';
import Payment from './pages/payment/payment ';
import PaymentConfirmation from './pages/payment/confirmation';
import Browse from './pages/browse/Browse';
import Search from './pages/search/Search';

function App() {
  library.add(fab, fas);
  return (
    <div data-testid="app" className="mt-10">
      <Provider store={store}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/accounts/*" element={<Accounts />}></Route>
          <Route path="/cart" element={<ViewCart />}></Route>
          <Route
            path={`${import.meta.env.VITE_BACKEND_URL}/auth/google/success`}
            element={<GoogleLoginSuccess />}
          ></Route>
          <Route path="/about_us" element={<About_us />}></Route>
          <Route path="/product/:id" element={<ProductPage />}></Route>
          <Route path="/accounts/*" element={isLoggedIn() ? <Home /> : <Accounts />}></Route>
          <Route path="/edit/password" element={isLoggedIn() ? <Changepassword /> : <Home />} />
          <Route path={routes.sellerListItems} element={<Seller />}></Route>
          <Route path="*" element={<Page404 />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/manage_users" element={<AssignRole />} />
          <Route
            path="/dashboard/*"
            element={
              <SellerComponent replace={<Page404 />}>
                <Dashboard />
              </SellerComponent>
            }
          />
          <Route path="/payment" element={isLoggedIn() ? <Payment /> : <Home />}></Route>
          <Route
            path="/checkout/redirect"
            element={isLoggedIn() ? <PaymentConfirmation /> : <Home />}
          ></Route>
          <Route path="/browse/*" element={<Browse />} />
          <Route path="/search/:query" element={<Search />}></Route>
        </Routes>
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
