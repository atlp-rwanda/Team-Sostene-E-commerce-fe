/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import store from '../store';
import { setToken } from './tokenSlice';

interface SignupState {
  response: any | null;
  loading: boolean;
  error: any | null;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
}

const BASE_URL: string = import.meta.env.VITE_BACKEND_URL;

export const signup = createAsyncThunk('users/signup', async (data: SignupData) => {
  try {
    const response = await axios.post(`${BASE_URL}users/signup`, data);
    if (response.status === 201) {
      toast.success('User created successful');
      setTimeout(() => {
        window.location.href = '/';
      }, 5000);
    }
    store.dispatch(setToken(response.data.token));
    localStorage.setItem('authenticationMethod', 'app');
    return response.data.token;
  } catch (err: any) {
    const error = err.response.data;
    toast.error(error.message || error.error);
    throw error;
  }
});

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    response: null,
    loading: false,
    error: null,
  } as SignupState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state, action: PayloadAction<SignupData>) => {
      state.loading = false;
      state.response = { ...action.payload };
      state.error = null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const signupActions = signupSlice.actions;
export default signupSlice.reducer;
