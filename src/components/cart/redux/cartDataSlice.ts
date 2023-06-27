import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type InitialCart_State = {
  loading: boolean;
  cart: CART;
  error: string;
};

export interface CART {
  products: {
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  }[];
  total: number;
}

const initialState: InitialCart_State = {
  loading: false,
  cart: {
    products: [],
    total: 0,
  },
  error: '',
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const getCartData = createAsyncThunk('cart/getCartData', async (data: { token: string }) => {
  const { token } = data;
  return axios
    .get(`${import.meta.env.VITE_BACKEND_URL}cart`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      switch (error.response.status) {
        case 401:
          return rejectWithValue(error.response.data.message);
        case 400:
          return rejectWithValue('Please Login to View Cart');
        default:
          return rejectWithValue(error.response.data.message);
      }
    });
});

const cartData = createSlice({
  name: 'getCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCartData.fulfilled, (state, action: PayloadAction<CART>) => {
      state.loading = false;
      state.cart = action.payload;
      state.error = '';
    });
    builder.addCase(getCartData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export default cartData.reducer;
