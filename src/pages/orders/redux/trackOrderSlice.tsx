import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Order } from '../../../utils/types/product';

const initialState: Order = {
  loading: false,
  message: '',
  error: '',
  data: {
    orders: [
      {
        id: '',
        status: '',
        products: [{ product: { id: '', image: '', name: '' }, quantity: 0 }],
        totalPrice: 0,
      },
    ],
  },
};

export const getOrder = createAsyncThunk('order/orderStatus', async (data: { token: string }) => {
  const { token } = data;
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

const fetchbuyerTrackOrder = createSlice({
  name: 'getOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrder.fulfilled, (state, action: PayloadAction<Order>) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = '';
      state.data = action.payload.data;
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message ?? 'Unknown Error';
    });
  },
});

export default fetchbuyerTrackOrder.reducer;
