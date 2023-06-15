import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type InitialState = {
  loading: boolean;
  products: PRODUCT[];
  error: string;
};

export type PRODUCT = {
  id: string;
  name: string;
  price: number;
  category: string;
  expDate: string;
  bonus: number;
  quantity: number;
  collectionId: string;
  expiredflag: boolean;
  createdAt: string;
  updatedAt: string;
  productImages: IMAGE[];
};

export type IMAGE = {
  id: string;
  url: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
};

const initialState: InitialState = {
  loading: false,
  products: [],
  error: '',
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const fetchTopProducts = createAsyncThunk('product/fetchTopProducts', async () => {
  return axios
    .get(`${import.meta.env.VITE_BACKEND_URL}products/all`)
    .then((response) => {
      return response.data.products;
    })
    .catch((error) => {
      switch (error.response.status) {
        case 500:
          return rejectWithValue('Internal Error.');
        default:
          return rejectWithValue(error.response.data.message);
      }
    });
});

const fetchTopProductsSlice = createSlice({
  name: 'fetchByCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTopProducts.fulfilled, (state, action: PayloadAction<PRODUCT[]>) => {
      state.loading = false;
      state.products = action.payload;
      state.error = '';
    });
    builder.addCase(fetchTopProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export default fetchTopProductsSlice.reducer;
