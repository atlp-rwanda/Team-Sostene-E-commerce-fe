/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { fireEvent, render, renderHook } from '@testing-library/react';
import Tfa from '../tfa/Tfa';
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, test, expect } from 'vitest';
import * as tfaHooks from '../tfa/hooks';
import { TFA_InitialState } from '../tfa/redux/tfaSlice';
import { useVerifyEmail } from '../tfa/hooks';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  const navigate = vi.fn();
  const mockLocation = () => {
    const email = 'test@example.com';
    const location = { state: { email } };
    return location;
  };
  return {
    ...(actual as object),
    useLocation: mockLocation,
    useNavigate: () => navigate,
  };
});

vi.mock('../../../redux/hooks', async () => {
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

describe('Testing Rendering of TFA page', () => {
  test('Should render tfa', () => {
    const useVerifyEmailMock = () => {
      const handleSubmit = (email: string, code?: string) => {
        email + code;
      };
      const verified: TFA_InitialState = {
        loading: false,
        error: '',
        token: 'this is a token',
      };
      return {
        handleSubmit,
        isVerified: verified,
      };
    };
    vi.spyOn(tfaHooks, 'useTwoFactor').mockReturnValueOnce('testing@mail.com');
    vi.spyOn(tfaHooks, 'useVerifyEmail').mockImplementationOnce(useVerifyEmailMock);
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Tfa />
        </BrowserRouter>
      </Provider>
    );
    // Simulating entering a code in the input field
    const codeInput = document.querySelector('input[type="text"]');
    fireEvent.change(codeInput!, { target: { value: '123456' } });

    // Simulating a button click
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    const title = getByText('Verify Your Identity');
    expect(title).toBeInTheDocument();
  });
  test('Should render tfa with loading', () => {
    const useVerifyEmailMock = () => {
      const handleSubmit = (email: string, code?: string) => {
        email + code;
      };
      const verified: TFA_InitialState = {
        loading: true,
        error: '',
        token: 'this is a token',
      };
      return {
        handleSubmit,
        isVerified: verified,
      };
    };
    vi.spyOn(tfaHooks, 'useTwoFactor').mockReturnValueOnce('testing@mail.com');
    const mockVerify = vi.spyOn(tfaHooks, 'useVerifyEmail').mockImplementation(useVerifyEmailMock);
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Tfa />
        </BrowserRouter>
      </Provider>
    );
    const title = getByText('Verify Your Identity');
    expect(title).toBeInTheDocument();

    mockVerify.mockRestore();
  });
  test('Should render tfa with Error', () => {
    const useVerifyEmailMock = () => {
      const handleSubmit = (email: string, code?: string) => {
        email + code;
      };
      const verified: TFA_InitialState = {
        loading: false,
        error: 'this is an Error',
        token: '',
      };
      return {
        handleSubmit,
        isVerified: verified,
      };
    };
    vi.spyOn(tfaHooks, 'useTwoFactor').mockReturnValueOnce('testing@mail.com');
    const mockVerify = vi.spyOn(tfaHooks, 'useVerifyEmail').mockImplementation(useVerifyEmailMock);
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Tfa />
        </BrowserRouter>
      </Provider>
    );
    const title = getByText('this is an Error');
    expect(title).toBeInTheDocument();

    mockVerify.mockRestore();
  });
});

describe('Testing TFA hooks', () => {
  it('returns email from location state', () => {
    const email = 'test@example.com';
    const { result } = renderHook(() => tfaHooks.useTwoFactor());

    expect(result.current).toBe(email);
  });
  test('Testing useVerifyEmail', () => {
    const TestComponent = () => {
      const { handleSubmit, isVerified } = useVerifyEmail();

      const handleFormSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        handleSubmit('test@example.com');
      };

      return (
        <div>
          <form onSubmit={handleFormSubmit} data-testid="email-form">
            <button type="submit">Submit</button>
          </form>
          {isVerified ? <p>Verification is fulfilled</p> : <p>Verification is pending</p>}
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
