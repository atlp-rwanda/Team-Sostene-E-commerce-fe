import { MemoryRouter } from 'react-router-dom';
import PaymentConfirmation from '../confirmation';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

store.getState().token = {
  value:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQxZDVjMTNjLWY3YmQtNGNiZC04ZjEyLTc5YjU1YTA5NGU1MCIsInVzZXJuYW1lIjoiZnJvbnRlbmQzIiwiZW1haWwiOiJmcm9udGVuZDNAZ21haWwuY29tIiwicm9sZSI6IkJVWUVSIiwic3RhdHVzIjoiQUNUSVZFIiwiaWF0IjoxNjg3MjEyODM3fQ.AE4NJ-meQdsv8O3iK0BBXHDBIS3pJUJIKLewFkN4v0Q',
};
const ConfirmPage = () => {
  return (
    <Provider store={store}>
      <MemoryRouter
        initialEntries={['/checkout/redirect?rid=d487c94b-ac12-4c78-99eb-f285c690fcfa']}
      >
        <PaymentConfirmation />
      </MemoryRouter>
    </Provider>
  );
};
export default {
  title: 'PAGES/payment/confirmation',
  component: ConfirmPage,
};
export const Default = () => <ConfirmPage />;
