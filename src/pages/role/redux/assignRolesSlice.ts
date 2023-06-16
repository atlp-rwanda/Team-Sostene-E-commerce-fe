import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface USER {
  id: string;
  email: string;
  username: string;
  role: string;
  status: string;
}
interface INITIAL_STATE {
  loading: boolean;
  users: USER[];
  error: string;
}
const initialState: INITIAL_STATE = {
  loading: false,
  users: [],
  error: '',
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const getUsers = createAsyncThunk('get/users', async ({ token }: { token: string }) => {
  return axios
    .get(`${import.meta.env.VITE_BACKEND_URL}users/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const usersArr = response.data.users.map((users: USER) => {
        return {
          id: users.id,
          email: users.email,
          username: users.username,
          role: users.role,
          status: users.status,
        };
      });
      return usersArr;
    })
    .catch((error) => {
      switch (error.response.status) {
        case 500:
          return rejectWithValue('Internal Error.');
        case 400:
          return rejectWithValue('Please Login.');
        default:
          return rejectWithValue(error.response.data.error);
      }
    });
});

export const getUsersSlice = createSlice({
  name: 'fetchUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<USER[]>) => {
      state.loading = false;
      state.users = action.payload;
      state.error = '';
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export const setRole = createAsyncThunk(
  'patch/users/role',
  async ({ id, role, token }: { id: string; role: string; token: string }) => {
    return axios
      .patch(
        `${import.meta.env.VITE_BACKEND_URL}users/${id}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        switch (error.response.status) {
          case 500:
            return rejectWithValue('Internal Error.');
          case 400:
            return rejectWithValue('Please Login.');
          case 401:
            return rejectWithValue('Unauthorized.');
          default:
            return rejectWithValue(error.response.data.error);
        }
      });
  }
);

export const setRolesSlice = createSlice({
  name: 'setRole',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(setRole.fulfilled, (state, action: PayloadAction<USER[]>) => {
      state.loading = false;
      state.users = action.payload;
      state.error = '';
    });
    builder.addCase(setRole.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export const disableAccountSlice = createSlice({
  name: 'disableAccount',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(disableAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(disableAccount.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(disableAccount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export const disableAccount = createAsyncThunk(
  'users/disable',
  async ({ id, token }: { id: string; token: string }) => {
    return axios
      .patch(
        `${import.meta.env.VITE_BACKEND_URL}users/disable/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        switch (error.response.status) {
          case 500:
            return rejectWithValue('Internal Error.');
          case 400:
            return rejectWithValue('Please Login.');
          case 401:
            return rejectWithValue('Unauthorized.');
          default:
            return rejectWithValue(error.response.data.error);
        }
      });
  }
);

export const getUserReducer = getUsersSlice.reducer;
export const setRoleReducer = setRolesSlice.reducer;
export const disableAccountReducer = disableAccountSlice.reducer;
