import SellerItems from './sellerItems';
import { Provider } from 'react-redux';
import store from '../../../../redux/store';

const SellerItemsComponent = () => {
  return (
    <Provider store={store}>
      <SellerItems />
    </Provider>
  );
};

export default {
  title: 'Components/Seller/SellerItems',
  component: SellerItemsComponent,
};

export const Default = () => <SellerItemsComponent />;
