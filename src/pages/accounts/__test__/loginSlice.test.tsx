import { vi } from 'vitest';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import { login } from '../login/redux/loginSlice';
import loginReducer from '../login/redux/loginSlice';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  const navigate = vi.fn();
  return {
    ...(actual as object), // since you still want to use the actual MemoryRouter
    useNavigate: () => navigate,
  };
});

describe('Testing LOGIN', () => {
  it('should pass', async () => {
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: { token: 'testToken' } });
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
      email: 'test@mail.com',
      password: '123456',
    };

    await store.dispatch(login(data));

    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}users/login`, {
      email: data.email,
      password: data.password,
    });
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
      email: 'test@mail.com',
      password: '123456',
    };

    await store.dispatch(login(data));

    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}users/login`, {
      email: data.email,
      password: data.password,
    });
  });
  it('should Fail with 406', async () => {
    const postSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce({
      response: {
        status: 406,
        data: {
          message: 'Unacceptable',
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
      email: 'test@mail.com',
      password: '123456',
    };

    await store.dispatch(login(data));

    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}users/login`, {
      email: data.email,
      password: data.password,
    });
  });
  it('should Fail with any code', async () => {
    const postSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce({
      response: {
        status: 500,
        data: {
          message: 'Internal Error',
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
      email: 'test@mail.com',
      password: '123456',
    };

    await store.dispatch(login(data));

    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}users/login`, {
      email: data.email,
      password: data.password,
    });
  });
});

describe('Testing tfaVerify slice', () => {
  it('should pass', async () => {
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: { token: 'testToken' } });
    const store = configureStore({
      reducer: loginReducer,
    });

    const data = {
      email: 'test@mail.com',
      password: '123456',
    };

    await store.dispatch(login(data));

    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}users/login`, {
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
      reducer: loginReducer,
    });

    const data = {
      email: 'test@mail.com',
      password: '123456',
    };

    await store.dispatch(login(data));

    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}users/login`, {
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
      reducer: loginReducer,
    });

    const data = {
      email: 'test@mail.com',
      password: '123456',
    };

    await store.dispatch(login(data));

    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}users/login`, {
      email: data.email,
      password: data.password,
    });
  });
  it('should pass', async () => {
    const postSpy = vi
      .spyOn(axios, 'post')
      .mockResolvedValueOnce({ data: { token: 'Code has been sent to your email' } });
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
      email: 'test@mail.com',
      password: '123456',
    };

    await store.dispatch(login(data));

    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}users/login`, {
      email: data.email,
      password: data.password,
    });
  });
});
