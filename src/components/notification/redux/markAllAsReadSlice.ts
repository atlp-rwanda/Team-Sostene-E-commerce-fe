import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import store from '../../../redux/store';

export type MARKALL_InitialState = {
  loading: boolean;
  message: string;
  error: string;
};

const initialState: MARKALL_InitialState = {
  loading: false,
  message: '',
  error: '',
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const markAllAsRead = createAsyncThunk('notifications/markall', async () => {
  const token = store.getState().token.value;
  return axios
    .post(
      `${import.meta.env.VITE_BACKEND_URL}notifications/read`,
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
        case 400:
          return rejectWithValue('UnAuthorized.');
        case 500:
          return rejectWithValue('Internal Error.');
        default:
          return rejectWithValue(error.response.data.message);
      }
    });
});

const markAllAsReadSlice = createSlice({
  name: 'markAllAsRead',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(markAllAsRead.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(markAllAsRead.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.message = action.payload;
      state.error = '';
    });
    builder.addCase(markAllAsRead.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export default markAllAsReadSlice.reducer;
