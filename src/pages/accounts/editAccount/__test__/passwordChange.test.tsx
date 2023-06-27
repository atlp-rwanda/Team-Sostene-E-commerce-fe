import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Changepassword from '../changepass';
import { MemoryRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { vi } from 'vitest';

const Demostore = configureStore({
  reducer: function (state = '') {
    return state;
  },
});

const Mockcontainer = () => {
  return (
    <Provider store={Demostore}>
      <MemoryRouter initialEntries={['/password/change']}>
        <Changepassword />
      </MemoryRouter>
    </Provider>
  );
};

describe('should test  change password component', function () {
  let old: Node | Window;
  let newPass: Node | Window;
  let confirm: Node | Window;
  let btn: Node | Window;
  let error: HTMLElement;

  beforeEach(() => {
    render(<Mockcontainer />);
    old = screen.getByTestId('oldpassword');
    newPass = screen.getByTestId('newpassword');
    confirm = screen.getByTestId('confirmpassword');
    btn = screen.getByText('CHANGE PASSWORD');
  });

  it('should test empty fields', async function () {
    fireEvent.change(old, { target: { value: '' } });
    fireEvent.change(newPass, { target: { value: '' } });
    fireEvent.change(confirm, { target: { value: '' } });
    fireEvent.click(btn);
    // error = screen.getByTestId('div1');
    // await waitFor(() => {
    //   expect(error.textContent).toBe(`Old Password is required !!`);
    // });
    await waitFor(() => {
      const errorDiv = screen.getByTestId('div1');
      expect(errorDiv.textContent).toBe('Old Password is required !!');
    });
  });

  it('should test password size', async function () {
    fireEvent.change(old, { target: { value: 'ok' } });
    fireEvent.change(newPass, { target: { value: 'okey' } });
    fireEvent.change(confirm, { target: { value: 'okey' } });
    fireEvent.click(btn);
    await waitFor(() => {
      error = screen.getByTestId('div2');
      expect(error.textContent).toBe(
        `Password not strong (use 8 characters including capital cases and signs)`
      );
    });
  });

  it('should test existence of sign or cahracters', async function () {
    fireEvent.change(old, { target: { value: 'ok' } });
    fireEvent.change(newPass, { target: { value: 'okeyyyyyyyy' } });
    fireEvent.change(confirm, { target: { value: 'okeyyyyyyyy' } });
    fireEvent.click(btn);
    await waitFor(() => {
      error = screen.getByTestId('div2');
      expect(error.textContent).toBe(
        `Password not strong (use 8 characters including capital cases and signs)`
      );
    });
  });

  it('should test success change password', async function () {
    fireEvent.change(old, { target: { value: 'Qwert@12345' } });
    fireEvent.change(newPass, { target: { value: 'Pass@12345' } });
    fireEvent.change(confirm, { target: { value: 'Pass@12345' } });
    fireEvent.click(btn);
    const success = screen.getByText('PASSWORD CHANGED SUCCESSFULLY');
    expect(success).toBeInTheDocument();
  });

  it('should test incorrect password', async function () {
    const errorSpy = vi.spyOn(toast, 'error');
    fireEvent.change(old, { target: { value: 'Qwert@12' } });
    fireEvent.change(newPass, { target: { value: 'Pass@12345' } });
    fireEvent.change(confirm, { target: { value: 'Pass@12345' } });
    fireEvent.click(btn);
    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith('Incorrect password');
    });
  });
  it('should test same passwords', async function () {
    fireEvent.change(old, { target: { value: 'Qwert@12' } });
    fireEvent.change(newPass, { target: { value: 'Pass@12345' } });
    fireEvent.change(confirm, { target: { value: 'Pass@1234567' } });
    fireEvent.click(btn);
    await waitFor(() => {
      error = screen.getByTestId('div3');
      expect(error.textContent).toBe('Check your Confirm password');
    });
  });

  it('should test same passwords new and old', async function () {
    fireEvent.change(old, { target: { value: 'Qwert@12345' } });
    fireEvent.change(newPass, { target: { value: 'Qwert@12345' } });
    fireEvent.change(confirm, { target: { value: 'Qwert@12345' } });
    fireEvent.click(btn);
    await waitFor(() => {
      error = screen.getByTestId('div3');
      expect(error.textContent).toBe('New password cannot be the same as the old password');
    });
  });
});
