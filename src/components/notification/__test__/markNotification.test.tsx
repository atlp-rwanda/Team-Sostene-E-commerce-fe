import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { vi } from 'vitest';
import markAllAsReadReducer, { markAllAsRead } from '../redux/markAllAsReadSlice';
import markOneAsReadReducer, { markOneAsRead } from '../redux/markOneAsReadSlice';

describe('Testing all notifications as readonly', () => {
  it('should dispatch mark all as read correctly', async () => {
    const store = configureStore({
      reducer: markAllAsReadReducer,
    });
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
      data: { data: { code: 200, message: 'Marked all done' } },
    });
    await store.dispatch(markAllAsRead());
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}notifications/read`,
      {},
      {
        headers: { Authorization: `Bearer null` },
      }
    );
  });
  it('should dispatch mark one as read correctly', async () => {
    const store = configureStore({
      reducer: markOneAsReadReducer,
    });
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
      data: { data: { code: 200, message: 'Marked one done' } },
    });
    const id = 'a3eb7848-b078-46e2-b61e-d3c85b705b1b';
    await store.dispatch(markOneAsRead(id));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}notifications/${id}/read`,
      {},
      {
        headers: { Authorization: `Bearer null` },
      }
    );
  });
  it('mark all notifications should fail with status 400', async () => {
    const store = configureStore({
      reducer: markAllAsReadReducer,
    });
    const postSpy = vi.spyOn(axios, 'post').mockRejectedValue({
      response: {
        status: 400,
        data: {
          message: 'Bad request',
        },
      },
    });

    await store.dispatch(markAllAsRead());
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}notifications/read`,
      {},
      {
        headers: { Authorization: `Bearer null` },
      }
    );
  });
  it('mark one notifications should fail with status 400', async () => {
    const store = configureStore({
      reducer: markOneAsReadReducer,
    });
    const postSpy = vi.spyOn(axios, 'post').mockRejectedValue({
      response: {
        status: 400,
        data: {
          message: 'Bad request',
        },
      },
    });
    const id = 'a3eb7848-b078-46e2-b61e-d3c85b705b1b';
    await store.dispatch(markOneAsRead(id));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}notifications/${id}/read`,
      {},
      {
        headers: { Authorization: `Bearer null` },
      }
    );
  });
  it('mark all notifications should fail with status 500', async () => {
    const store = configureStore({
      reducer: markAllAsReadReducer,
    });
    const postSpy = vi.spyOn(axios, 'post').mockRejectedValue({
      response: {
        status: 500,
        data: {},
      },
    });

    await store.dispatch(markAllAsRead());
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}notifications/read`,
      {},
      {
        headers: { Authorization: `Bearer null` },
      }
    );
  });
  it('mark all notifications should fail with any status code', async () => {
    const store = configureStore({
      reducer: markAllAsReadReducer,
    });
    const postSpy = vi.spyOn(axios, 'post').mockRejectedValue({
      response: {
        status: 600,
        data: {},
      },
    });

    await store.dispatch(markAllAsRead());
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}notifications/read`,
      {},
      {
        headers: { Authorization: `Bearer null` },
      }
    );
  });
  it('mark one notifications should fail with status 500', async () => {
    const store = configureStore({
      reducer: markOneAsReadReducer,
    });
    const postSpy = vi.spyOn(axios, 'post').mockRejectedValue({
      response: {
        status: 500,
        data: {},
      },
    });

    const id = 'a3eb7848-b078-46e2-b61e-d3c85b705b1b';
    await store.dispatch(markOneAsRead(id));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}notifications/${id}/read`,
      {},
      {
        headers: { Authorization: `Bearer null` },
      }
    );
  });
  it('mark one notifications should fail with any status code', async () => {
    const store = configureStore({
      reducer: markAllAsReadReducer,
    });
    const postSpy = vi.spyOn(axios, 'post').mockRejectedValue({
      response: {
        status: 600,
        data: {},
      },
    });

    const id = 'a3eb7848-b078-46e2-b61e-d3c85b705b1b';
    await store.dispatch(markOneAsRead(id));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}notifications/${id}/read`,
      {},
      {
        headers: { Authorization: `Bearer null` },
      }
    );
  });
});
