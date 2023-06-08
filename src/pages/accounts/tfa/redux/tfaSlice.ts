import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import store from '../../../../redux/store';
import { setToken } from '../../../../redux/slices/tokenSlice';

export type TFA_InitialState = {
  loading: boolean;
  token: string;
  error: string;
};

type USER = {
  email: string;
  code: string;
};

const initialState: TFA_InitialState = {
  loading: false,
  token: '',
  error: '',
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const tfaVerify = createAsyncThunk('user/authenticate', async (data: USER) => {
  return axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/users/verify/${data.email}`, {
      email: data.email,
      verificationCode: data.code,
    })
    .then((response) => {
      store.dispatch(setToken(response.data.token));
      return response.data.token;
    })
    .catch((error) => {
      switch (error.response.status) {
        case 406:
          return rejectWithValue('Invalid Code, Retry.');
        case 500:
          return rejectWithValue('Internal Error.');
        default:
          return rejectWithValue(error.response.data.message);
      }
    });
});

const usertfaVerify = createSlice({
  name: 'tfaVerify',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(tfaVerify.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(tfaVerify.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.token = action.payload;
      state.error = '';
    });
    builder.addCase(tfaVerify.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});
const usertfaVerifyReducers = usertfaVerify.reducer;
export default usertfaVerifyReducers;
