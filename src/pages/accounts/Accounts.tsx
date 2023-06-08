import { Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import { AccountsLoader } from '../../components/Loaders/Loaders';
import routes from '../../utils/routes';
import Navigation from '../../components/navigation/nav';
import './login/style.scss';

const Tfa = lazy(() => import('./tfa/Tfa'));
const Signup = lazy(() => import('./signup/signup'));
const Login = lazy(() => import('./login/Login'));

export default function Accounts() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="account__container" data-testid="accounts">
      <Navigation />
      <Suspense fallback={<AccountsLoader />}>
        {routes.authenticate === pathname && <Tfa />}
        {routes.signup === pathname && <Signup />}
        {routes.login === pathname && <Login />}
      </Suspense>
    </div>
  );
}
