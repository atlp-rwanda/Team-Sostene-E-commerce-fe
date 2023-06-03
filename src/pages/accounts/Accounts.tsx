import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AccountsLoader } from '../../components/Loaders/Loaders';

const Tfa = lazy(() => import('./tfa/Tfa'));

const Signup = lazy(() => import('./signup/signup'));

export default function Accounts() {
  return (
    <div className="account__container" data-testid="accounts">
      <Suspense fallback={<AccountsLoader />}>
        <Routes>
          <Route path="/authenticate" element={<Tfa />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}
