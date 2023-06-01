import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AccountsLoader } from '../../components/Loaders';

const Tfa = lazy(() => import('./tfa/Tfa'));

export default function Accounts() {
  return (
    <div className="account__container" data-testid="accounts">
      <Suspense fallback={<AccountsLoader />}>
        <Routes>
          <Route path="/authenticate" element={<Tfa />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}
