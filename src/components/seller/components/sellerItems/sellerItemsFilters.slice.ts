import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import store from '../../../../redux/store';

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
  productImages: { url: string }[];
};
export interface filterActions {
  loading: boolean;
  errors: null | string;
  search: string;
  page: number;
  products: PRODUCT[];
}

export const initialState: filterActions = {
  loading: true,
  errors: null,
  search: '',
  page: 1,
  products: [
    {
      id: '',
      name: '',
      price: 0,
      category: '',
      expDate: '',
      bonus: 0,
      quantity: 0,
      collectionId: '',
      expiredflag: false,
      createdAt: '',
      updatedAt: '',
      productImages: [{ url: '' }],
    },
  ],
};

export const sellerProducts = createAsyncThunk(
  'seller/get',
  async ({ myParam, page }: { myParam: string; page: number }) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}products/list-items/${myParam}?page=${page}&limit=10`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${store.getState().token.value}`,
        },
      }
    );
    return res.data.product;
  }
);

export const createFiltersSlice = createSlice({
  name: 'filterSearch',
  initialState,
  reducers: {
    setSearch: (state, action: { type: string; payload: string }) => {
      state.search = action.payload;
    },
    setPage: (state, action: { type: string; payload: number }) => {
      state.page = action.payload;
    },
    clearProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sellerProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sellerProducts.fulfilled, (state, action: PayloadAction<PRODUCT[]>) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(sellerProducts.rejected, (state, action) => {
      state.errors = action.error.message || 'Unknown Error';
      state.loading = false;
    });
  },
});

export const { setPage, setSearch, clearProduct } = createFiltersSlice.actions;

const filterCollectionProductsReducer = createFiltersSlice.reducer;

export default filterCollectionProductsReducer;
