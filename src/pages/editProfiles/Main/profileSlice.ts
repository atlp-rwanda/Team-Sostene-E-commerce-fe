import { createSlice } from '@reduxjs/toolkit';

export interface profileInterface {
  names: string;
  gender: string;
  birthdate: string;
  language: string;
  city: string;
  street: string;
  currency: string;
  postalCode: string;
  country: string;
  accountNumber: string;
  accountName: string;
  telephone: string;
  createdAt?: string;
  updatedAt?: string;
}
export const initialState: profileInterface = {
  names: '',
  gender: '',
  birthdate: '',
  language: '',
  city: '',
  street: '',
  currency: '',
  postalCode: '',
  country: '',
  accountNumber: '',
  accountName: '',
  telephone: '',
};

export const createProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setData: (
      state,
      action: {
        type: string;
        payload: {
          names: string;
          gender: string;
          birthdate: string;
          city: string;
          street: string;
          language: string;
          accountName: string;
          telephone: string;
        };
      }
    ) => {
      state.names = action.payload.names;
      state.gender = action.payload.gender;
      state.birthdate = action.payload.birthdate;
      state.city = action.payload.city;
      state.street = action.payload.street;
      state.language = action.payload.language;
      state.accountName = action.payload.accountName;
      state.telephone = action.payload.telephone;
    },
  },
});

export const { setData } = createProfileSlice.actions;

const editProfileReducers = createProfileSlice.reducer;

export default editProfileReducers;
