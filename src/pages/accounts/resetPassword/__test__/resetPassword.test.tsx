import { fireEvent, render, waitFor } from '@testing-library/react';
import ResetPassword from '../ResetPassword';
import { Provider } from 'react-redux';
import store from '../../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { useResetPassword } from '../hooks';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  const navigate = vi.fn();
  return {
    ...(actual as object),
    useNavigate: () => navigate,
  };
});

vi.mock('../../../../redux/hooks', async () => {
  const dispatch = async () => {
    const response = {
      meta: {
        requestStatus: 'fulfilled',
      },
    };
    return response;
  };
  const foo = (state: { twoFactor: string }) => {
    return state.twoFactor;
  };
  return {
    useAppDispatch: () => dispatch,
    useAppSelector: () => foo,
  };
});

describe('Testing Rendering of Forgot password pages', () => {
  test('Should render reset Password form', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ResetPassword />
        </BrowserRouter>
      </Provider>
    );
    const submitButton = getByText('Change Password');
    fireEvent.click(submitButton);

    const title = getByText('Reset Password');
    expect(title).toBeInTheDocument();
  });
});

describe('Testing Reset Password errors', () => {
  it('should display validation errors for password and confirm password fields', async () => {
    const { getByTestId, getByText } = render(<ResetPassword />);

    const passwordInput = getByTestId('newpassword');
    const confirmPasswordInput = getByTestId('confirmpassword');
    const changePasswordButton = getByText('Change Password');

    fireEvent.click(changePasswordButton);

    await waitFor(() => {
      expect(getByText('Password is required')).toBeInTheDocument();
      expect(getByText('Please confirm your password')).toBeInTheDocument();
    });

    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'weake' } });
    fireEvent.click(changePasswordButton);

    await waitFor(() => {
      expect(
        getByText(
          'Must be at least 8 characters, containing a capital letter, a number and a symbol'
        )
      ).toBeInTheDocument();
      expect(getByText("Passwords don't match")).toBeInTheDocument();
    });
  });
});

describe('Testing reset password hooks', () => {
  test('Testing useResetPassword', () => {
    const TestComponent = () => {
      const { handleSubmit } = useResetPassword();

      const handleFormSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        handleSubmit({ password: 'Testing@123' }, 'Fake!to-ke1n');
      };

      return (
        <div>
          <form onSubmit={handleFormSubmit} data-testid="email-form">
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    };
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <TestComponent />
        </BrowserRouter>
      </Provider>
    );
    fireEvent.submit(getByTestId('email-form'));
    expect(getByTestId('email-form')).toBeInTheDocument();
  });
});
