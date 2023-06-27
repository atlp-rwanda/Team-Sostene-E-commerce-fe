import { configureStore } from '@reduxjs/toolkit';
import {
  resetPasswordReducer,
  forgotPasswordReducer,
  forgotPassword,
  resetPassword,
} from '../redux/resetPasswordSlice';
import axios from 'axios';
import { vi } from 'vitest';

describe('Reset Password tests', () => {
  it('should dispatch forgotPassword action correctly', async () => {
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
    const email = 'test@example.com';
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
      data: { data: { code: 200, message: 'Message  sent successfully!' } },
    });

    await store.dispatch(forgotPassword({ email: email }));
    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}users/forgotPassword`, {
      email: email,
    });
  });

  it('should dispatch forgotPassword correctly using the actual reducer', async () => {
    const store = configureStore({
      reducer: forgotPasswordReducer,
    });
    const email = 'test@example.com';
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
      data: { data: { code: 200, message: 'Message  sent successfully!' } },
    });

    await store.dispatch(forgotPassword({ email: email }));
    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}users/forgotPassword`, {
      email: email,
    });
  });

  it('should dispatch resetPassword action correctly', async () => {
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
    const password = 'Testing@123';
    const token = 'fake/To-ke1n';
    const postSpy = vi.spyOn(axios, 'put').mockResolvedValueOnce({
      data: { data: { code: 200, message: 'You have reset successful your password' } },
    });

    await store.dispatch(resetPassword({ password: password, token: token }));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}users/reset-password/${token}`,
      {
        password: password,
      }
    );
  });

  it('should dispatch resetPassword action correctly using the actual reducer', async () => {
    const store = configureStore({
      reducer: resetPasswordReducer,
    });
    const password = 'Testing@123';
    const token = 'fake/To-ke1n';
    const postSpy = vi.spyOn(axios, 'put').mockResolvedValueOnce({
      data: { data: { code: 200, message: 'You have reset successful your password' } },
    });

    await store.dispatch(resetPassword({ password: password, token: token }));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}users/reset-password/${token}`,
      {
        password: password,
      }
    );
  });

  it('resetPassword should fail with status 401', async () => {
    const postSpy = vi.spyOn(axios, 'put').mockRejectedValueOnce({
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
      password: 'Testing@123',
      token: 'fake/To-ke1n',
    };

    await store.dispatch(resetPassword(data));

    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}users/reset-password/${data.token}`,
      {
        password: data.password,
      }
    );
  });
  it('resetPassword should fail with status 401 with the actual reducer', async () => {
    const postSpy = vi.spyOn(axios, 'put').mockRejectedValueOnce({
      response: {
        status: 401,
        data: {
          message: 'Unauthorized',
        },
      },
    });
    const store = configureStore({
      reducer: resetPasswordReducer,
    });

    const data = {
      password: 'Testing@123',
      token: 'fake/To-ke1n',
    };

    await store.dispatch(resetPassword(data));

    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}users/reset-password/${data.token}`,
      {
        password: data.password,
      }
    );
  });
  it('resetPassword should fail with status 500 with the actual reducer but without the error message', async () => {
    const postSpy = vi.spyOn(axios, 'put').mockRejectedValueOnce({
      response: {
        status: 500,
        data: {},
      },
    });
    const store = configureStore({
      reducer: resetPasswordReducer,
    });

    const data = {
      password: 'Testing@123',
      token: 'fake/To-ke1n',
    };

    await store.dispatch(resetPassword(data));

    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}users/reset-password/${data.token}`,
      {
        password: data.password,
      }
    );
  });
  it('resetPassword should fail with status 400', async () => {
    const postSpy = vi.spyOn(axios, 'put').mockRejectedValueOnce({
      response: {
        status: 400,
        data: {
          message: 'Bad request',
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
      password: 'Testing@123',
      token: 'fake/To-ke1n',
    };

    await store.dispatch(resetPassword(data));

    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}users/reset-password/${data.token}`,
      {
        password: data.password,
      }
    );
  });
  it('resetPassword should fail with any status code', async () => {
    const postSpy = vi.spyOn(axios, 'put').mockRejectedValueOnce({
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
      password: 'Testing@123',
      token: 'fake/To-ke1n',
    };

    await store.dispatch(resetPassword(data));

    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}users/reset-password/${data.token}`,
      {
        password: data.password,
      }
    );
  });
  it('forgotPassword should fail with status 401', async () => {
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

    const email = 'test@example.com';

    await store.dispatch(forgotPassword({ email: email }));

    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}users/forgotPassword`, {
      email: email,
    });
  });
  it('forgotPassword should fail with status 400', async () => {
    const postSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce({
      response: {
        status: 400,
        data: {
          message: 'Bad request',
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

    const email = 'test@example.com';

    await store.dispatch(forgotPassword({ email: email }));

    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}users/forgotPassword`, {
      email: email,
    });
  });
  it('forgotPassword should fail with any status code', async () => {
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

    const email = 'test@example.com';

    await store.dispatch(forgotPassword({ email: email }));

    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}users/forgotPassword`, {
      email: email,
    });
  });

  it('forgotPassword should fail with status 400', async () => {
    const postSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce({
      response: {
        status: 400,
        data: {
          message: 'Bad request',
        },
      },
    });
    const store = configureStore({
      reducer: forgotPasswordReducer,
    });

    const email = 'test@example.com';

    await store.dispatch(forgotPassword({ email: email }));

    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}users/forgotPassword`, {
      email: email,
    });
  });
  it('forgotPassword should fail with any status code', async () => {
    const postSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce({
      response: {
        status: 500,
        data: {},
      },
    });
    const store = configureStore({
      reducer: forgotPasswordReducer,
    });

    const email = 'test@example.com';

    await store.dispatch(forgotPassword({ email: email }));

    expect(postSpy).toBeCalledWith(`${import.meta.env.VITE_BACKEND_URL}users/forgotPassword`, {
      email: email,
    });
  });
});
