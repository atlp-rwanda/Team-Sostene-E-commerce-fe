/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { vi, vitest } from 'vitest';
import { signup } from '../../../redux/slices/signup';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import tfaReducer from '../../../redux/slices/signup';
import { toast } from 'react-toastify';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  const navigate = vi.fn();
  return {
    ...(actual as object),
    useNavigate: () => navigate,
  };
});

const mockSetTimeout = (callback: Function, _delay: number) => {
  callback();
};

describe('Testing signup', () => {
  beforeEach(() => {
    vitest.useFakeTimers(); // Mock timers including setTimeout
  });

  afterEach(() => {
    vitest.runOnlyPendingTimers(); // Run any pending timers after each test case
    vitest.useRealTimers(); // Restore real timers
  });

  it('should register', async () => {
    const postSpy = vitest
      .spyOn(axios, 'post')
      .mockResolvedValueOnce({ data: { token: 'testToken' } });
    const store = configureStore({
      reducer: function (state = '', action) {
        switch (action.type) {
          case 'users/signup':
            return action.payload;
          default:
            return state;
        }
      },
    });

    const data = {
      username: 'test',
      email: 'test@mail.com',
      password: '@Test250',
    };

    await store.dispatch(signup(data));

    const BASE_URL: string = import.meta.env.VITE_BACKEND_URL;

    expect(postSpy).toBeCalledWith(`${BASE_URL}users/signup`, {
      username: data.username,
      email: data.email,
      password: data.password,
    });
  });

  it('should succeed with 201', async () => {
    const postSpy = vitest.spyOn(axios, 'post').mockResolvedValueOnce({
      status: 201,
      data: {
        message: 'successfully registered',
      },
    });
    const toastSuccessMock = vitest.fn(); // Mock the toast.success function
    vitest.spyOn(toast, 'success').mockImplementation(toastSuccessMock); // Spy on the mock function
    const store = configureStore({
      reducer: function (state = '', action) {
        switch (action.type) {
          case 'user/setToken':
            return action.payload;
          default:
            return state;
        }
      },
    });

    const data = {
      username: 'test',
      email: 'test@mail.com',
      password: '@Test250',
    };

    await store.dispatch(signup(data));

    const BASE_URL: string = import.meta.env.VITE_BACKEND_URL;
    expect(postSpy).toBeCalledWith(`${BASE_URL}users/signup`, {
      username: data.username,
      email: data.email,
      password: data.password,
    });

    expect(toastSuccessMock).toBeCalledWith('User created successful');

    mockSetTimeout(() => {
      expect(window.location.href).toMatch(/\/$/);
    }, 5000);
  });

  it('should Fail with 401', async () => {
    const postSpy = vitest.spyOn(axios, 'post').mockRejectedValueOnce({
      response: {
        status: 401,
        data: {
          message: 'Unauthorized',
        },
      },
    });
    const store = configureStore({
      reducer: function (state = '', action) {
        switch (action.type) {
          case 'user/setToken':
            return action.payload;
          default:
            return state;
        }
      },
    });

    const data = {
      username: 'test',
      email: 'test@mail.com',
      password: '@Test250',
    };

    await store.dispatch(signup(data));

    const BASE_URL: string = import.meta.env.VITE_BACKEND_URL;
    expect(postSpy).toBeCalledWith(`${BASE_URL}users/signup`, {
      username: data.username,
      email: data.email,
      password: data.password,
    });
  });
});

describe('Testing signup', () => {
  it('should register', async () => {
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: { token: 'testToken' } });
    const store = configureStore({
      reducer: function (state = '', action) {
        switch (action.type) {
          case 'users/signup':
            return action.payload;
          default:
            return state;
        }
      },
    });

    const data = {
      username: 'test',
      email: 'test@mail.com',
      password: '@Test250',
    };

    await store.dispatch(signup(data));

    const BASE_URL: string = import.meta.env.VITE_BACKEND_URL;

    expect(postSpy).toBeCalledWith(`${BASE_URL}users/signup`, {
      username: data.username,
      email: data.email,
      password: data.password,
    });
  });
  it('should succeed with 201', async () => {
    const postSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce({
      response: {
        status: 201,
        data: {
          message: 'successfully registered',
        },
      },
    });
    const store = configureStore({
      reducer: function (state = '', action) {
        switch (action.type) {
          case 'user/setToken':
            return action.payload;
          default:
            return state;
        }
      },
    });

    const data = {
      username: 'test',
      email: 'test@mail.com',
      password: '@Test250',
    };

    await store.dispatch(signup(data));

    const BASE_URL: string = import.meta.env.VITE_BACKEND_URL;
    expect(postSpy).toBeCalledWith(`${BASE_URL}users/signup`, {
      username: data.username,
      email: data.email,
      password: data.password,
    });
    setTimeout(() => {
      expect(window.location.href).toBe('/');
    }, 5000);
  });

  it('should Fail with 401', async () => {
    const postSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce({
      response: {
        status: 401,
        data: {
          message: 'Unauthorized',
        },
      },
    });
    const store = configureStore({
      reducer: function (state = '', action) {
        switch (action.type) {
          case 'user/setToken':
            return action.payload;
          default:
            return state;
        }
      },
    });

    const data = {
      username: 'test',
      email: 'test@mail.com',
      password: '@Test250',
    };

    await store.dispatch(signup(data));

    const BASE_URL: string = import.meta.env.VITE_BACKEND_URL;
    expect(postSpy).toBeCalledWith(`${BASE_URL}users/signup`, {
      username: data.username,
      email: data.email,
      password: data.password,
    });
  });
});

describe('Testing signup slice', () => {
  it('should pass', async () => {
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: { token: 'testToken' } });
    const store = configureStore({
      reducer: tfaReducer,
    });

    const data = {
      username: 'test',
      email: 'test@mail.com',
      password: 'Test1234',
    };

    await store.dispatch(signup(data));

    const BASE_URL: string = import.meta.env.VITE_BACKEND_URL;
    expect(postSpy).toBeCalledWith(`${BASE_URL}users/signup`, {
      username: data.username,
      email: data.email,
      password: data.password,
    });
  });
  it('should fail', async () => {
    const postSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce({
      response: {
        status: 500,
        data: {
          message: 'Internal Error',
        },
      },
    });
    const store = configureStore({
      reducer: tfaReducer,
    });

    const data = {
      username: 'Test',
      email: 'test@mail.com',
      password: 'Test1234',
    };

    await store.dispatch(signup(data));

    const BASE_URL: string = import.meta.env.VITE_BACKEND_URL;
    expect(postSpy).toBeCalledWith(`${BASE_URL}users/signup`, {
      username: data.username,
      email: data.email,
      password: data.password,
    });
  });
  it('should fail with no message', async () => {
    const postSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce({
      response: {
        status: 500,
        data: {},
      },
    });
    const store = configureStore({
      reducer: tfaReducer,
    });

    const data = {
      username: 'Test',
      email: 'test@mail.com',
      password: 'Test1234',
    };

    await store.dispatch(signup(data));

    const BASE_URL: string = import.meta.env.VITE_BACKEND_URL;
    expect(postSpy).toBeCalledWith(`${BASE_URL}users/signup`, {
      username: data.username,
      email: data.email,
      password: data.password,
    });
  });
});
