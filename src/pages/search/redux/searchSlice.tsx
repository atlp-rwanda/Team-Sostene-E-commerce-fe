import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Result {
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
  productImages: {
    url: string;
  }[];
}

export type Search_InitialState = {
  search: any;
  loading: boolean;
  result: Result[];
  error: string;
};

const initialState: Search_InitialState = {
  loading: false,
  result: [],
  error: '',
  search: undefined
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const searchProduct = createAsyncThunk('search/products', async (query: string) => {
  return axios
    .get(`${import.meta.env.VITE_BACKEND_URL}products/search?key=${query}`)
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

const searchSlice = createSlice({
  name: 'searchProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchProduct.fulfilled, (state, action: PayloadAction<Result[]>) => {
      state.loading = false;
      state.result = action.payload;
      state.error = '';
    });
    builder.addCase(searchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

const searchReducer = searchSlice.reducer;
export default searchReducer;
