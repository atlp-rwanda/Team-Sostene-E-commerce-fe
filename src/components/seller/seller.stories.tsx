import Seller from './seller';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';

const SellerComponent = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Seller />
      </BrowserRouter>
    </Provider>
  );
};
export default {
  title: 'Components/Seller',
  component: SellerComponent,
};
export const Default = () => <SellerComponent />;
