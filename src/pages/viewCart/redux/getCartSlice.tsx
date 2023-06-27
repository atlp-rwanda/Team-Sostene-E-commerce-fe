import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Cart } from '../../../utils/types/product';

type GET_CART_State = {
  loading: boolean;
  message: string;
  error: string;
  data: Cart;
};

const initialState: GET_CART_State = {
  loading: false,
  message: '',
  error: '',
  data: { total: 0, products: [] },
};

export const getCart = createAsyncThunk('cart/getCart', async (data: { token: string }) => {
  const { token } = data;
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

const buyerViewCart = createSlice({
  name: 'getCart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<GET_CART_State>) => {
      state.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action: PayloadAction<GET_CART_State>) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = '';
      state.data = action.payload.data;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export default buyerViewCart.reducer;
export const { setCart } = buyerViewCart.actions;
