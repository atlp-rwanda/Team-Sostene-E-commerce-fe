<<<<<<< HEAD
import { render, screen, fireEvent } from '@testing-library/react';
import { it, describe, expect, vi } from 'vitest';
import Navigation from '../nav';
import { library } from '@fortawesome/fontawesome-svg-core';
import { BrowserRouter } from 'react-router-dom';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { setToken } from '../../../redux/slices/tokenSlice';

vi.mock('darkreader', () => ({
  enable: vi.fn(),
  disable: vi.fn(),
  setFetchMethod: vi.fn(),
}));

const MockNav = () => {
  library.add(fab, fas);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </Provider>
  );
};

describe('testing the nav', function () {
  beforeAll(() => {
    localStorage.setItem('authenticationMethod', 'app');
  });
  afterAll(() => {
    localStorage.removeItem('authenticationMethod');
  });
  it('should test navigation component', function () {
    store.dispatch(setToken('initialTokenValue'));
    render(<MockNav />);
    const Ele = screen.getByPlaceholderText(/What are you looking for?/i);
    expect(Ele).toBeInTheDocument();
  });

  it('testing the user icon', function () {
    store.dispatch(setToken('initialTokenValue'));
    render(<MockNav />);
    const Ele = screen.getByLabelText('user-icon');
    fireEvent.click(Ele);
    const settingElement = screen.getByText(/Manage My Account/i);
    expect(settingElement).toBeInTheDocument();
  });

  it('testing the notification icon', function () {
    render(<MockNav />);
    const icon = screen.getByLabelText('notification-icon');
    fireEvent.click(icon);
    expect(icon).toBeInTheDocument();
  });

  it('testing the notification icon when user icon was active', function () {
    render(<MockNav />);
    const icon = screen.getByLabelText('user-icon');
    fireEvent.click(icon);
    const icon1 = screen.getByLabelText('notification-icon');
    fireEvent.click(icon1);
    expect(icon1).toBeInTheDocument();
  });

  it('testing the bars icon', function () {
    store.dispatch(setToken('initialTokenValue'));
    render(<MockNav />);
    const icon = screen.getByLabelText('bars-icon');
    fireEvent.click(icon);
    const settingElement = screen.getByTestId('overview-nav');
    expect(icon).toBeInTheDocument();
    expect(settingElement).toBeVisible();
  });

  it('testing interaction of home and user icons', function () {
    store.dispatch(setToken('initialTokenValue'));
    render(<MockNav />);
    const userIcon = screen.getByLabelText('user-icon');
    fireEvent.click(userIcon);
    const settingElement = screen.getByTestId('right-nav');
    expect(settingElement).toBeVisible();
  });
  it('testing interaction of home and user icons', function () {
    store.dispatch(setToken('initialTokenValue'));
    render(<MockNav />);
    const userIcon = screen.getByLabelText('user-icon');
    fireEvent.click(userIcon);
    const settingElement = screen.getByText(/Manage My Account/i);
    expect(settingElement).toBeInTheDocument();
  });
});
=======
import { render, screen, fireEvent } from '@testing-library/react';
import { it, describe, expect } from 'vitest';
import Navigation from '../nav';
import { library } from '@fortawesome/fontawesome-svg-core';
import { BrowserRouter } from 'react-router-dom';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { setToken } from '../../../redux/slices/tokenSlice';

const MockNav = () => {
  library.add(fab, fas);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </Provider>
  );
};
describe('tetsing the nav', function () {
  beforeAll(() => {
    localStorage.setItem('authenticationMethod', 'app');
  });
  afterAll(() => {
    localStorage.removeItem('authenticationMethod');
  });
  it('should test navigation component', function () {
    store.dispatch(setToken('initialTokenValue'));
    render(<MockNav />);
    const Ele = screen.getByPlaceholderText(/What are you looking for?/i);
    expect(Ele).toBeInTheDocument();
  });

  it('testing the user icon', function () {
    store.dispatch(setToken('initialTokenValue'));
    render(<MockNav />);
    const Ele = screen.getByLabelText('user-icon');
    fireEvent.click(Ele);
    const settingElement = screen.getByText(/Manage My Account/i);
    expect(settingElement).toBeInTheDocument();
  });

  it('testing the notification icon', function () {
    render(<MockNav />);
    const icon = screen.getByLabelText('notification-icon');
    fireEvent.click(icon);
    expect(icon).toBeInTheDocument();
  });

  it('testing the notification icon when user icon was active', function () {
    render(<MockNav />);
    const icon = screen.getByLabelText('user-icon');
    fireEvent.click(icon);
    const icon1 = screen.getByLabelText('notification-icon');
    fireEvent.click(icon1);
    expect(icon1).toBeInTheDocument();
  });

  it('testing the bars icon', function () {
    store.dispatch(setToken('initialTokenValue'));
    render(<MockNav />);
    const icon = screen.getByLabelText('bars-icon');
    fireEvent.click(icon);
    const settingElement = screen.getByTestId('overview-nav');
    expect(icon).toBeInTheDocument();
    expect(settingElement).toBeVisible();
  });

  it('testing interaction of home and user icons', function () {
    store.dispatch(setToken('initialTokenValue'));
    render(<MockNav />);
    const userIcon = screen.getByLabelText('user-icon');
    fireEvent.click(userIcon);
    const settingElement = screen.getByTestId('right-nav');
    expect(settingElement).toBeVisible();
  });
  it('testing interaction of home and user icons', function () {
    store.dispatch(setToken('initialTokenValue'));
    render(<MockNav />);
    const userIcon = screen.getByLabelText('user-icon');
    fireEvent.click(userIcon);
    const settingElement = screen.getByText(/Manage My Account/i);
    expect(settingElement).toBeInTheDocument();
  });
});
>>>>>>> A seller should be to update the product in case he/she needs to - ensures that user have the form to update their certain products -allow user to view a way to update an image displayed on product also Delivers #185172094]
