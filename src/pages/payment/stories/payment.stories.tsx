import { MemoryRouter } from 'react-router-dom';
import Payment from '../payment ';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

const PaymentPage = () => {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={['/payment?rid=d487c94b-ac12-4c78-99eb-f285c690fcfa']}>
        <Payment />
      </MemoryRouter>
    </Provider>
  );
};
export default {
  title: 'PAGES/payment/paymentForm',
  component: PaymentPage,
};
export const Default = () => <PaymentPage />;
