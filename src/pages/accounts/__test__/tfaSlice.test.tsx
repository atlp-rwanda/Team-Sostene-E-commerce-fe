import { vi } from 'vitest';
import { tfaVerify } from '../tfa/redux/tfaSlice';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import tfaReducer from '../tfa/redux/tfaSlice';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  const navigate = vi.fn();
  return {
    ...(actual as object), // since you still want to use the actual MemoryRouter
    useNavigate: () => navigate,
  };
});

describe('Testing tfaVerify', () => {
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
      code: '123456',
    };

    await store.dispatch(tfaVerify(data));

    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}/users/verify/${data.email}`,
      {
        email: data.email,
        verificationCode: data.code,
      }
    );
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
      code: '123456',
    };

    await store.dispatch(tfaVerify(data));

    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}/users/verify/${data.email}`,
      {
        email: data.email,
        verificationCode: data.code,
      }
    );
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
      code: '123456',
    };

    await store.dispatch(tfaVerify(data));

    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}/users/verify/${data.email}`,
      {
        email: data.email,
        verificationCode: data.code,
      }
    );
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
      code: '123456',
    };

    await store.dispatch(tfaVerify(data));

    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}/users/verify/${data.email}`,
      {
        email: data.email,
        verificationCode: data.code,
      }
    );
  });
});

describe('Testing tfaVerify slice', () => {
  it('should pass', async () => {
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({ data: { token: 'testToken' } });
    const store = configureStore({
      reducer: tfaReducer,
    });

    const data = {
      email: 'test@mail.com',
      code: '123456',
    };

    await store.dispatch(tfaVerify(data));

    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}/users/verify/${data.email}`,
      {
        email: data.email,
        verificationCode: data.code,
      }
    );
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
      email: 'test@mail.com',
      code: '123456',
    };

    await store.dispatch(tfaVerify(data));

    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}/users/verify/${data.email}`,
      {
        email: data.email,
        verificationCode: data.code,
      }
    );
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
      email: 'test@mail.com',
      code: '123456',
    };

    await store.dispatch(tfaVerify(data));

    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}/users/verify/${data.email}`,
      {
        email: data.email,
        verificationCode: data.code,
      }
    );
  });
});
