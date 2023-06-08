import { createSlice } from '@reduxjs/toolkit';

export interface filterActions {
  search: string;
  page: number;
}

export const initialState: filterActions = {
  search: '',
  page: 1,
};

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
  },
});

export const { setPage, setSearch } = createFiltersSlice.actions;

const filterCollectionProductsReducer = createFiltersSlice.reducer;

export default filterCollectionProductsReducer;
