import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import store from '../../../redux/store';

export type MARKONE_InitialState = {
  loading: boolean;
  message: string;
  error: string;
};

const initialState: MARKONE_InitialState = {
  loading: false,
  message: '',
  error: '',
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const markOneAsRead = createAsyncThunk('notifications/markone', async (id: string) => {
  const token = store.getState().token.value;
  return axios
    .post(
      `${import.meta.env.VITE_BACKEND_URL}notifications/${id}/read`,
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

const markOneAsReadSlice = createSlice({
  name: 'markOneAsRead',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(markOneAsRead.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(markOneAsRead.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.message = action.payload;
      state.error = '';
    });
    builder.addCase(markOneAsRead.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export default markOneAsReadSlice.reducer;
