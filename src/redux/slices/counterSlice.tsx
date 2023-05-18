import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface countState {
  counter: number;
  status: string;
}

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter:0,
    status: 'idle',
  } as countState,
  reducers: {
    increment: (state) => {
      state.counter +=1;
    },
    addValue: (state, action: PayloadAction<number>) => {
        const task = action.payload;
        state.counter +=task;
      },
  },
});
 export const { addValue,increment } = counterSlice.actions
 export default counterSlice.reducer
