import { createSlice } from '@reduxjs/toolkit';

export interface ImageInterf {
  url: string;
  file: any;
}

export interface initialStateProductInterface {
  productName: string;
  productPrice: number;
  quantity: number;
  expDate: Date;
  category: string;
  bonus: number;
  description: string;
  image: ImageInterf[] | [];
}
export interface Productinterf {
  product: initialStateProductInterface;
}

export const initialStateProducts: Productinterf = {
  product: {
    productName: '',
    productPrice: 1,
    quantity: 1,
    expDate: new Date(),
    category: '',
    bonus: 0,
    description: '',
    image: [],
  },
};

const addProductSlices = createSlice({
  name: 'addProducts',
  initialState: initialStateProducts,
  reducers: {
    setProduct: (state, action: { type: string; payload: initialStateProductInterface }) => {
      state.product = action.payload;
    },
  },
});

export const { setProduct } = addProductSlices.actions;
const productsAddReducers = addProductSlices.reducer;
export default productsAddReducers;
