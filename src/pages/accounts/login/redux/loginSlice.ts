import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import store from '../../../../redux/store';
import { setToken } from '../../../../redux/slices/tokenSlice';

type InitialState = {
  loading: boolean;
  token: string;
  error: string;
};

type USER = {
  email: string;
  password: string;
};

const initialState: InitialState = {
  loading: false,
  token: '',
  error: '',
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const login = createAsyncThunk('user/login', async (data: USER) => {
  return axios
    .post(`${import.meta.env.VITE_BACKEND_URL}users/login`, data)
    .then((response) => {
      store.dispatch(setToken(response.data.token));
      localStorage.setItem('authenticationMethod', 'app');
      return response.data.message;
    })
    .catch((error) => {
      switch (error.response.status) {
        case 406:
          return rejectWithValue(error.response.data.message);
        case 401:
          return rejectWithValue(error.response.data.message);
        case 304:
          return rejectWithValue(error.message);
        default:
          return rejectWithValue(error.response.data.message);
      }
    });
});

const userLogin = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.token = action.payload;
      state.error = '';
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export default userLogin.reducer;
