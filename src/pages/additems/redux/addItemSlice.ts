/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import store from '../../../redux/store';

export interface Product {
  name: string;
  price: number;
  category: string;
  expDate: string;
  bonus: number;
  quantity: number;
  collectionId: string;
  img: {
    url: string;
  }[];
}

export type Search_InitialState = {
  loading: boolean;
  result: string;
  error: string;
};

const initialState: Search_InitialState = {
  loading: false,
  result: '',
  error: '',
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const addProduct = createAsyncThunk(
  'add/products',
  async ({ data, collectionId }: { data: any; collectionId: string }) => {
    const token = store.getState().token.value;
    return axios
      .post(`${import.meta.env.VITE_BACKEND_URL}products/collection/${collectionId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data.message;
      })
      .catch((error) => {
        switch (error.response.status) {
          case 500:
            return rejectWithValue('Internal Error.');
          default:
            return rejectWithValue(error.response.data.error);
        }
      });
  }
);

const addProductSlice = createSlice({
  name: 'addProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.result = action.payload;
      state.error = '';
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

const addProductReducer = addProductSlice.reducer;
export default addProductReducer;
