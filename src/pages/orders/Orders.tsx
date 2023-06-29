import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AccountsLoader } from '../../components/Loaders/Loaders';

const AllOrders = lazy(() => import('./trackOrder'));
const SingleOrder = lazy(() => import('./viewSingleOrder'));

export default function Order() {
  return (
    <div className="account__container" data-testid="orders">
      <Suspense fallback={<AccountsLoader />}>
        <Routes>
          <Route path="/trackOrders" element={<AllOrders />}></Route>
          <Route path="/singleOrder" element={<SingleOrder />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}
