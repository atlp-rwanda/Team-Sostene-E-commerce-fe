/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type InitialState = {
  checkout: any;
  loading: boolean;
  data: SUCCESS;
  error: string;
};

type SUCCESS = {
  code: number;
  message: string;
};

const initialState: InitialState = {
  loading: false,
  data: {
    code: 0,
    message: '',
  },
  error: '',
  checkout: undefined,
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const checkout = createAsyncThunk(
  'users/checkout',
  async ({
    token,
    firstName,
    lastName,
    phoneNumber,
    streetAddress,
    country,
    city,
    postalCode,
  }: {
    token: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    streetAddress: string;
    country: string;
    city: string;
    postalCode: string;
  }) => {
    let id = '';
    await axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}users/shipping-address`,
        {
          firstName,
          lastName,
          phoneNumber,
          streetAddress,
          country,
          city,
          postalCode,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        id = response.data.addressAdded.id;
        return response.data.addressAdded;
      })
      .catch((error) => {
        switch (error.response.status) {
          case 400:
            return rejectWithValue(error.response.data.message);
          default:
            return rejectWithValue(error.response.data.message);
        }
      });
    return axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}checkout`,
        { shippingAddressId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        return response.data.order;
      })
      .catch((error) => {
        switch (error.response.status) {
          case 400:
            return rejectWithValue(error.response.data.message);
          case 409:
            return rejectWithValue(getMessage(error.response.data.unavailableProducts));
          default:
            return rejectWithValue(error.response.data.message);
        }
      });
  }
);

interface Product {
  product: { id?: string; name: string; price: number; image: string };
  quantity: number;
}
const getMessage = (unavailableProducts: Product[]) => {
  const productNames = unavailableProducts.map((item: Product) => item.product.name);
  const popupMessage = `These products are less in stock: ${productNames.join(', ')}`;
  return popupMessage;
};

const CheckoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkout.fulfilled, (state, action: PayloadAction<SUCCESS>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(checkout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error 😢';
    });
  },
});

export const checkoutReducer = CheckoutSlice.reducer;
