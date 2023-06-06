import { render, screen, fireEvent } from '@testing-library/react';
import { it, describe, expect } from 'vitest';
import Navigation from '../nav';
import { library } from '@fortawesome/fontawesome-svg-core';
import { BrowserRouter } from 'react-router-dom';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const Demostore = configureStore({
  reducer: function (state = { token: { value: 'initialTokenValue' } }) {
    return state;
  },
});

const MockNav = () => {
  library.add(fab, fas);
  return (
    <Provider store={Demostore}>
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
    render(<MockNav />);
    const Ele = screen.getByPlaceholderText(/What are you looking for?/i);
    expect(Ele).toBeInTheDocument();
  });

  it('testing the user icon', function () {
    render(<MockNav />);
    const Ele = screen.getByLabelText('user-icon');
    fireEvent.click(Ele);
    const settingElement = screen.getByText(/Manage My Account/i);
    expect(settingElement).toBeInTheDocument();
  });
  it('testing the home icon', function () {
    render(<MockNav />);
    const icon = screen.getByLabelText('home-icon');
    fireEvent.click(icon);
    const settingElement = screen.getByTestId('right-nav');
    expect(icon).toBeInTheDocument();
    expect(settingElement).toBeVisible();
  });

  it('testing the notification icon', function () {
    render(<MockNav />);
    const icon = screen.getByLabelText('notification-icon');
    fireEvent.click(icon);
    expect(icon).toBeInTheDocument();
  });

  it('testing the notification icon when home icon was active', function () {
    render(<MockNav />);
    const icon = screen.getByLabelText('home-icon');
    fireEvent.click(icon);
    const icon1 = screen.getByLabelText('notification-icon');
    fireEvent.click(icon1);
    expect(icon1).toBeInTheDocument();
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
    render(<MockNav />);
    const icon = screen.getByLabelText('bars-icon');
    fireEvent.click(icon);
    const settingElement = screen.getByTestId('overview-nav');
    expect(icon).toBeInTheDocument();
    expect(settingElement).toBeVisible();
  });

  it('testing interaction of home and user icons', function () {
    render(<MockNav />);
    const userIcon = screen.getByLabelText('user-icon');
    const homeIcon = screen.getByLabelText('home-icon');
    fireEvent.click(userIcon);
    fireEvent.click(homeIcon);
    const settingElement = screen.getByTestId('right-nav');
    expect(settingElement).toBeVisible();
  });
  it('testing interaction of home and user icons', function () {
    render(<MockNav />);
    const userIcon = screen.getByLabelText('user-icon');
    const homeIcon = screen.getByLabelText('home-icon');
    fireEvent.click(homeIcon);
    fireEvent.click(userIcon);
    const settingElement = screen.getByText(/Manage My Account/i);
    expect(settingElement).toBeInTheDocument();
  });
});
