import Navigation from '../navigation/nav';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
  library.add(fab, fas);
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
};
export default {
  title: 'App/Navigation Bar',
  component: Nav,
};
export const Default = () => <Nav />;
