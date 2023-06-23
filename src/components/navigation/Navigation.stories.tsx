import Navigation from '../navigation/nav';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import store from '../../redux/store';

const Nav = () => {
  library.add(fab, fas);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </Provider>
  );
};
export default {
  title: 'App/Navigation Bar',
  component: Nav,
};
export const Default = () => <Nav />;
