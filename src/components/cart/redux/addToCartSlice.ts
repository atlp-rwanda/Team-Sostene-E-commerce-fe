import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type ADD_TOCART_State = {
  loading: boolean;
  message: string;
  error: string;
};

const initialState: ADD_TOCART_State = {
  loading: false,
  message: '',
  error: '',
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (data: { id: string; token: string }) => {
    const { id, token } = data;
    return axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}cart/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        return response.data.message;
      })
      .catch((error) => {
        switch (error.response.status) {
          case 406:
            return rejectWithValue(error.response.data.message);
          case 401:
            return rejectWithValue(error.response.data.message);
          default:
            return rejectWithValue(error.response.data.message);
        }
      });
  }
);

const useraddToCart = createSlice({
  name: 'addToCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.message = action.payload;
      state.error = '';
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export default useraddToCart.reducer;
