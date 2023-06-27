<<<<<<< HEAD
import { configureStore } from '@reduxjs/toolkit';
import { checkoutReducer, checkout } from '../redux/checkoutSlice';
import axios from 'axios';
import { vi } from 'vitest';

describe('Checkout tests', () => {
  const token = 'exampleTok!en';
  const checkoutDetails = {
    token: 'exampleTok!en',
    firstName: 'examplefname',
    lastName: 'examplelname',
    phoneNumber: '099999999',
    streetAddress: 'kkkk8988',
    country: 'Rwanda',
    city: 'Kigali',
    postalCode: '00000',
  };

  const shippingDetails = {
    firstName: 'examplefname',
    lastName: 'examplelname',
    phoneNumber: '099999999',
    streetAddress: 'kkkk8988',
    country: 'Rwanda',
    city: 'Kigali',
    postalCode: '00000',
  };

  it('should dispatch checkout action correctly', async () => {
    const store = configureStore({
      reducer: checkoutReducer,
    });
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
      data: { data: { code: 200, message: 'Order processed successfully' } },
    });

    await store.dispatch(checkout(checkoutDetails));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}users/shipping-address`,
      shippingDetails,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  });
  it('checkout should fail with status 401', async () => {
    const store = configureStore({
      reducer: checkoutReducer,
    });
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
      response: {
        status: 401,
        data: {
          message: 'Unauthorized',
        },
      },
    });

    await store.dispatch(checkout(checkoutDetails));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}users/shipping-address`,
      shippingDetails,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  });
  it('checkout should fail with any status', async () => {
    const store = configureStore({
      reducer: checkoutReducer,
    });
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
      response: {
        status: 500,
        data: {},
      },
    });

    await store.dispatch(checkout(checkoutDetails));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}users/shipping-address`,
      shippingDetails,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  });
  it('checkout should fail with status 400', async () => {
    const store = configureStore({
      reducer: checkoutReducer,
    });
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
      response: {
        status: 400,
        data: {
          message: 'Bad request',
        },
      },
    });

    await store.dispatch(checkout(checkoutDetails));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}users/shipping-address`,
      shippingDetails,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  });
  it('should dispatch product action correctly', async () => {
    const store = configureStore({
      reducer: checkoutReducer,
    });
    const errorMessage = 'Some error message';
    const postSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce({
      response: {
        status: 404,
        data: {
          message: errorMessage,
        },
      },
    });
    const checkoutDetails = {
      token: 'exampleTok!en',
      firstName: 'examplefname',
      lastName: 'examplelname',
      phoneNumber: '099999999',
      streetAddress: 'kkkk8988',
      country: 'Rwanda',
      city: 'Kigali',
      postalCode: '00000',
    };
    try {
      await store.dispatch(checkout(checkoutDetails));
    } catch (error) {
      const rejectedValue = store.getState().checkout.error;
      expect(rejectedValue).toEqual(errorMessage);
    }
    await store.dispatch(checkout(checkoutDetails));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}users/shipping-address`,
      shippingDetails,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  });
});
=======
import { configureStore } from '@reduxjs/toolkit';
import { checkoutReducer, checkout } from '../redux/checkoutSlice';
import axios from 'axios';
import { vi } from 'vitest';

describe('Checkout tests', () => {
  const token = 'exampleTok!en';
  const checkoutDetails = {
    token: 'exampleTok!en',
    firstName: 'examplefname',
    lastName: 'examplelname',
    phoneNumber: '099999999',
    streetAddress: 'kkkk8988',
    country: 'Rwanda',
    city: 'Kigali',
    postalCode: '00000',
  };

  const shippingDetails = {
    firstName: 'examplefname',
    lastName: 'examplelname',
    phoneNumber: '099999999',
    streetAddress: 'kkkk8988',
    country: 'Rwanda',
    city: 'Kigali',
    postalCode: '00000',
  };

  it('should dispatch checkout action correctly', async () => {
    const store = configureStore({
      reducer: checkoutReducer,
    });
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
      data: { data: { code: 200, message: 'Order processed successfully' } },
    });

    await store.dispatch(checkout(checkoutDetails));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}users/shipping-address`,
      shippingDetails,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  });
  it('checkout should fail with status 401', async () => {
    const store = configureStore({
      reducer: checkoutReducer,
    });
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
      response: {
        status: 401,
        data: {
          message: 'Unauthorized',
        },
      },
    });

    await store.dispatch(checkout(checkoutDetails));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}users/shipping-address`,
      shippingDetails,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  });
  it('checkout should fail with any status', async () => {
    const store = configureStore({
      reducer: checkoutReducer,
    });
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
      response: {
        status: 500,
        data: {},
      },
    });

    await store.dispatch(checkout(checkoutDetails));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}users/shipping-address`,
      shippingDetails,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  });
  it('checkout should fail with status 400', async () => {
    const store = configureStore({
      reducer: checkoutReducer,
    });
    const postSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
      response: {
        status: 400,
        data: {
          message: 'Bad request',
        },
      },
    });

    await store.dispatch(checkout(checkoutDetails));
    expect(postSpy).toBeCalledWith(
      `${import.meta.env.VITE_BACKEND_URL}users/shipping-address`,
      shippingDetails,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  });
});
>>>>>>> A seller should be to update the product in case he/she needs to - ensures that user have the form to update their certain products -allow user to view a way to update an image displayed on product also Delivers #185172094]
