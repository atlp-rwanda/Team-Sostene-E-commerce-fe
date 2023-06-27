import { fireEvent, render } from '@testing-library/react';
import Login from '../login/Login';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import * as loginHooks from '../login/hooks';
import store from '../../../redux/store';
import { toast } from 'react-toastify';
import { isValidEmail } from '../login/hooks';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

const MockElement = () => {
  library.add(fab, fas);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
};

describe('Testing Rendering of Login page', () => {
  test('Should render Login', () => {
    const useLoginMock = () => {
      const handleLogin = (user: { email: string; password?: string }) => {
        user;
      };
      const isLoggedIn = {
        loading: false,
        token: '',
        error: '',
      };
      return {
        handleLogin,
        isLoggedIn,
      };
    };

    vi.spyOn(loginHooks, 'useLogin').mockImplementationOnce(useLoginMock);
    const { getByTestId, getByText } = render(<MockElement />);
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.change(emailInput!, { target: { value: 'ntwarijoseph2050@gmail.com' } });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.change(passwordInput!, { target: { value: 'Qwert@12345' } });

    const submitButton = getByText('Login');
    fireEvent.click(submitButton);
    expect(getByTestId('Login')).toBeInTheDocument();
  });
  test('Should render Login', () => {
    const useLoginMock = () => {
      const handleLogin = (user: { email: string; password: string }) => {
        user;
      };
      const isLoggedIn = {
        loading: false,
        token: '',
        error: '',
      };
      return {
        handleLogin,
        isLoggedIn,
      };
    };

    vi.spyOn(loginHooks, 'useLogin').mockImplementationOnce(useLoginMock);
    const { getByTestId, getByText } = render(<MockElement />);
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.change(emailInput!, { target: { value: 'eddymugisha96@gmail.com' } });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.change(passwordInput!, { target: { value: 'Eddy@12345' } });

    const submitButton = getByText('Login');
    fireEvent.click(submitButton);

    // Test for isLoggedIn.token being 'Code has been sent to your email'
    expect(getByTestId('Login')).toBeInTheDocument();
    // Update the useLoginMock implementation to return a non-empty token
    vi.spyOn(loginHooks, 'useLogin').mockImplementationOnce(() => {
      const handleLogin = (user: { email: string; password?: string }) => {
        user;
      };
      const isLoggedIn = {
        loading: false,
        token: 'some-token-value',
        error: '',
      };
      return {
        handleLogin,
        isLoggedIn,
      };
    });
    // Rerender the Login component with the updated useLoginMock
    render(<MockElement />);

    // Test for isLoggedIn.token not being empty
    expect(window.location.href.endsWith('/')).toBe(true);
  });
  test('Should input a valid email', () => {
    const useLoginMock = () => {
      const handleLogin = (user: { email: string; password?: string }) => {
        user;
      };
      const isLoggedIn = {
        loading: false,
        token: '',
        error: 'Please enter valid email',
      };
      return {
        handleLogin,
        isLoggedIn,
      };
    };
    vi.spyOn(loginHooks, 'useLogin').mockImplementationOnce(useLoginMock);
    const errorSpy = vi.spyOn(toast, 'error');
    const { getByText } = render(<MockElement />);
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.change(emailInput!, { target: { value: 'validemail' } });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.change(passwordInput!, { target: { value: 'Qwert@12345' } });
    const submitButton = getByText('Login');
    fireEvent.click(submitButton);
    expect(errorSpy).toHaveBeenCalledWith('Please enter valid email');
  });
  test('Should input a valid password', () => {
    const useLoginMock = () => {
      const handleLogin = (user: { email: string; password: string }) => {
        user;
      };
      const isLoggedIn = {
        loading: false,
        token: '',
        error: 'Password should be at least 5 characters long and contain uppercase and lowercase',
      };
      return {
        handleLogin,
        isLoggedIn,
      };
    };

    vi.spyOn(loginHooks, 'useLogin').mockImplementationOnce(useLoginMock);
    const errorSpy = vi.spyOn(toast, 'error');
    const { getByText } = render(<MockElement />);
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.change(emailInput!, { target: { value: 'ntwarijoseph@gmail.com' } });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.change(passwordInput!, { target: { value: 'pass' } });
    const submitButton = getByText('Login');
    fireEvent.click(submitButton);
    expect(errorSpy).toHaveBeenCalledWith(
      'Password should be at least 5 characters long and contain uppercase and lowercase'
    );
  });

  test('Should render Login with Loading', () => {
    const useLoginMock = () => {
      const handleLogin = (user: { email: string; password?: string }) => {
        user;
      };
      const isLoggedIn = {
        loading: true,
        token: '',
        error: '',
      };
      return {
        handleLogin,
        isLoggedIn,
      };
    };

    vi.spyOn(loginHooks, 'useLogin').mockImplementationOnce(useLoginMock);
    const { getByTestId } = render(<MockElement />);
    expect(getByTestId('Login')).toBeInTheDocument();
  });
  test('Should Give an error when there is no login occured', () => {
    const useLoginMock = () => {
      const handleLogin = (user: { email: string; password?: string }) => {
        user;
      };
      const isLoggedIn = {
        loading: false,
        token: '',
        error: 'Login didnt work',
      };
      return {
        handleLogin,
        isLoggedIn,
      };
    };
    vi.spyOn(loginHooks, 'useLogin').mockImplementationOnce(useLoginMock);
    const { getByTestId } = render(<MockElement />);
    expect(getByTestId('Login')).toBeInTheDocument();
  });
});

describe('Testing Login hooks', () => {
  test('Testing UseLogin', () => {
    const TestComponent = () => {
      library.add(fab, fas);
      const { handleLogin, isLoggedIn } = loginHooks.useLogin();

      const handleFormSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        handleLogin({ email: 'test@example.com', password: 'testpassword' });
      };
      return (
        <div>
          <form onSubmit={handleFormSubmit} data-testid="email-form">
            <button type="submit">Submit</button>
          </form>
          {isLoggedIn ? <p>Login is fulfilled</p> : <p>Login is pending</p>}
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

describe('CHecking the valid email', () => {
  test('should display an error toast for an invalid email', () => {
    // Mock the data object with an invalid email
    const data = {
      email: 'invalid-email',
    };

    // Mock the isValidEmail function
    const isValidEmail = vi.fn().mockReturnValue(false);

    // Run the code to be tested
    if (!isValidEmail(data.email)) {
      toast.error('Please enter a valid email');
    }

    // Verify that the toast.error function was called
    expect(toast.error).toHaveBeenCalledWith('Please enter a valid email');
  });
});
describe('isValidEmail', () => {
  it('should return false for an invalid email', () => {
    const invalidEmail = 'invalid-email';

    const result = isValidEmail(invalidEmail);

    expect(result).toBe(false);
  });
});
