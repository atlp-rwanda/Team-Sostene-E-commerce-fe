import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type ResetPassInitialState = {
  loading: boolean;
  data: SUCCESS;
  error: string;
};

type SUCCESS = {
  code: number;
  message: string;
};

const initialState: ResetPassInitialState = {
  loading: false,
  data: {
    code: 0,
    message: '',
  },
  error: '',
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const forgotPassword = createAsyncThunk(
  'users/forgotPassword',
  async (data: { email: string }) => {
    const useremail = { email: data.email };

    return axios
      .post(`${import.meta.env.VITE_BACKEND_URL}users/forgotPassword`, useremail)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        switch (error.response.status) {
          case 400:
            return rejectWithValue(error.response.data.message);
          default:
            return rejectWithValue(error.response.data.message);
        }
      });
  }
);

export const resetPassword = createAsyncThunk(
  'users/reset-password/{token}',
  async (data: { password: string; token: string }) => {
    const token = data.token;
    const userpassword = { password: data.password };

    return axios
      .put(`${import.meta.env.VITE_BACKEND_URL}users/reset-password/${token}`, userpassword)
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        switch (error.response.status) {
          case 400:
            return rejectWithValue(error.response.data.error);
          case 401:
            return rejectWithValue(error.response.data.message);
          default:
            return rejectWithValue(error.response.data.message);
        }
      });
  }
);

const ResetPasswordSlice = createSlice({
  name: 'sentLink',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action: PayloadAction<SUCCESS>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error 😢';
    });
  },
});

const ForgotPasswordSlice = createSlice({
  name: 'sentLink',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action: PayloadAction<SUCCESS>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error 😢';
    });
  },
});

export const forgotPasswordReducer = ForgotPasswordSlice.reducer;
export const resetPasswordReducer = ResetPasswordSlice.reducer;
