import { Provider } from 'react-redux';
import store from '../../../redux/store';
import Changepassword from './changepass';
import { BrowserRouter } from 'react-router-dom';

const Changepass = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Changepassword />
      </BrowserRouter>
    </Provider>
  );
};

export default {
  title: 'App/Form/ChangePassword',
  component: Changepass,
};

export const Default = () => <Changepass />;
