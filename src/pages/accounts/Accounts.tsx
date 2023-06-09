import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AccountsLoader } from '../../components/Loaders/Loaders';
import { ReverseProtectedComponent } from '../../components/roles/Protected';
import Home from '../home/home';

const Tfa = lazy(() => import('./tfa/Tfa'));
const Signup = lazy(() => import('./signup/signup'));
const Login = lazy(() => import('./login/Login'));

const ResetPassword = lazy(() => import('./resetPassword/index'));

export default function Accounts() {
  return (
    <div className="account__container" data-testid="accounts">
      <Suspense fallback={<AccountsLoader />}>
        <Routes>
          <Route path="/authenticate" element={<Tfa />}></Route>
          <Route
            path="/signup"
            element={
              <ReverseProtectedComponent replace={<Home />}>
                <Signup />
              </ReverseProtectedComponent>
            }
          />
          {/* <Route path="/signup" element={<Signup />}></Route> */}
          <Route
            path="/login"
            element={
              <ReverseProtectedComponent replace={<Home />}>
                <Login />
              </ReverseProtectedComponent>
            }
          />
          <Route path="/reset-password/*" element={<ResetPassword />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}
