import { createSlice } from '@reduxjs/toolkit';

export interface chatsInterface {
  messageChat: string;
}

export const initialState: chatsInterface = {
  messageChat: '',
};

export const chatsSlices = createSlice({
  name: 'filterSearch',
  initialState,
  reducers: {
    setMessageChat: (state, action: { type: string; payload: string }) => {
      state.messageChat = action.payload;
    },
  },
});

export const { setMessageChat } = chatsSlices.actions;

const chatsReducers = chatsSlices.reducer;

export default chatsReducers;
