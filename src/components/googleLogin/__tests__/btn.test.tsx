import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import GoogleBtn from '../button';
import { googleSuccess, googleFailure } from '../button';
import store from '../../../redux/store';
import { configureStore } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { vi } from 'vitest';

const Demostore = configureStore({
  reducer: function (state = '') {
    return state;
  },
});

describe('should test the render of google button', function () {
  it('should render the button', async function () {
    render(
      <Provider store={Demostore}>
        <GoogleBtn width={'300'} />
      </Provider>
    );
    const ele = screen.getByTestId('google-login');
    fireEvent.click(ele);
    expect(ele).toBeInTheDocument();
  });

  it('should test the success login', async function () {
    const response = {
      clientId: 'test_id',
      credential:
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQlVZRVIiLCJJc3N1ZXIiOiJJc3N1ZXIiLCJpYXQiOjE2ODU2OTgyMDMsImVtYWlsIjoiZXhhbXBsZUBleGFtcGxlLmNvbSJ9.pcHVot6j_api-Wd_UCmmelVkctLYMIuz7NnmFqo9XQY',
      select_by: 'TEST',
    };
    await googleSuccess(response);
    const newState = store.getState();
    expect(newState.token).toBeTruthy();
  });

  it('should test the failed login', async function () {
    const errorSpy = vi.spyOn(toast, 'error');
    googleFailure();
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith('Login was unsuccessful, Try Again !!');
  });
});
