import { renderHook, act } from '@testing-library/react';
import { toast } from 'react-toastify';
import { useLogin, isValidEmail, isStrongPassword } from '../hooks';
import { beforeEach, describe, test, vi } from 'vitest';
import store, { RootState } from '../../../../redux/store';
import { Provider } from 'react-redux';
import { Store, AnyAction } from 'redux';

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('useLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should call toast.error when email is invalid', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: ({ children }) => (
        <Provider store={store as unknown as Store<RootState, AnyAction>}>{children}</Provider>
      ),
    });
    const { handleLogin } = result.current;
    const user = { email: 'invalidEmail', password: 'validPassword12@' };

    act(() => {
      handleLogin(user);
    });

    expect(toast.error).toHaveBeenCalledWith('Please enter valid email');
  });

  test('should call toast.error when password is not strong', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: ({ children }) => (
        <Provider store={store as unknown as Store<RootState, AnyAction>}>{children}</Provider>
      ),
    });
    const { handleLogin } = result.current;
    const user = { email: 'validemail@example.com', password: 'weak' };

    act(() => {
      handleLogin(user);
    });

    expect(toast.error).toHaveBeenCalledWith(
      'Password should be at least 5 characters long and contain uppercase and lowercase'
    );
  });
});

describe('isValidEmail', () => {
  test('should return true for a valid email', () => {
    const email = 'validemail@example.com';
    const isValid = isValidEmail(email);
    expect(isValid).toBe(true);
  });

  test('should return false for an invalid email', () => {
    const email = 'invalidEmail';
    const isValid = isValidEmail(email);
    expect(isValid).toBe(false);
  });
});

describe('isStrongPassword', () => {
  test('should return true for a strong password', () => {
    const password = 'StrongPassword1';
    const isStrong = isStrongPassword(password);
    expect(isStrong).toBe(true);
  });

  test('should return false for a weak password', () => {
    const password = 'weak';
    const isStrong = isStrongPassword(password);
    expect(isStrong).toBe(false);
  });
});
