import { PayloadAction, createSlice } from '@reduxjs/toolkit';


export interface Profile {
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
}

export type Profile_InitialState = {
  loading: boolean;
  profile: Profile;
  error: string;
};

const initialState: Profile_InitialState = {
  loading: false,
  profile: {
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
  },
  error: '',
};

const ProfileSlice = createSlice({
  name: 'getProduct',
  initialState,
  reducers: {
    addProfile: (state, action: PayloadAction<Profile>) => {
        state.profile = action.payload;
      },
    updateProfile: (state, action: PayloadAction<Profile>) => {
        state.profile = action.payload;
      },
},
});
export const {addProfile, updateProfile} = ProfileSlice.actions
const profileReducer = ProfileSlice.reducer;
export default profileReducer;
