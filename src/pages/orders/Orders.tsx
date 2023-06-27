import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AccountsLoader } from '../../components/Loaders/Loaders';

const Orders = lazy(() => import('./trackOrder'));
const SingleOrder = lazy(() => import('./viewSingleOrder'));
export default function Accounts() {
  return (
    <div className="account__container" data-testid="accounts">
      <Suspense fallback={<AccountsLoader />}>
        <Routes>
          <Route path="/trackOrders" element={<Orders />}></Route>
          <Route path="/singleOrder" element={<SingleOrder />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}
