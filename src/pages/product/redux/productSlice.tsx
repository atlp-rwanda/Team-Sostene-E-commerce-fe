import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  error: any;
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
  description: string;
  productImages?: {
    url: string;
  }[];
}

export type Search_InitialState = {
  loading: boolean;
  product: any;
  error: string;
};

const initialState: Search_InitialState = {
  loading: false,
  product: {
    id: '',
    name: '',
    price: 0,
    category: '',
    expDate: '',
    bonus: 0,
    quantity: 0,
    collectionId: '',
    expiredflag: false,
    description: '',
    createdAt: '',
    updatedAt: '',
    productImages: [
      {
        url: '',
      },
    ],
  },
  error: '',
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const getProduct = createAsyncThunk('product/get', async (id: string) => {
  return axios
    .get(`${import.meta.env.VITE_BACKEND_URL}products/${id}`)
    .then((response) => {
      return response.data.data;
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

const ProductSlice = createSlice({
  name: 'getProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      state.loading = false;
      state.product = action.payload;
      state.error = '';
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

const productReducer = ProductSlice.reducer;
export default productReducer;
