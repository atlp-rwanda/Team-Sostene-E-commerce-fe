import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  id: string;
  collectionId: string;
  price: number;
  name: string;
  bonus: number;
  category: string;
  quantity: number;
  expDate: string;
  expiredflag: boolean;
  productImages: { url: string }[];
  createdAt: string;
  updatedAt: string;
}

interface TokenState {
  value: Product[];
  status: string;
}
const initialState: TokenState = {
  value: [
    {
      id: '',
      collectionId: '',
      price: 0,
      name: '',
      bonus: 0,
      category: '',
      quantity: 0,
      expDate: `${new Date()}`,
      expiredflag: false,
      productImages: [{ url: '' }],
      createdAt: `${new Date()}`,
      updatedAt: `${new Date()}`,
    },
  ],
  status: 'idle',
};

export const allProducts = createAsyncThunk('products/get', async () => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}products/all`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
});

const pruductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    removeProduct: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((product) => product.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(allProducts.pending, (state) => {
      state.status = 'loading';
    });
    builder
      .addCase(allProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload.products;
      })
      .addCase(allProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { removeProduct } = pruductSlice.actions;
export default pruductSlice.reducer;
