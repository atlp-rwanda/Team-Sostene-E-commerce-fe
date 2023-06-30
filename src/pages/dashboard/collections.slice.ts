import { createSlice } from '@reduxjs/toolkit';
import { CollectionInterface } from '../../hooks/hooks';

export interface Collections {
  collectionName: string;
  collectionsList: CollectionInterface[] | [];
}

export const initialState: Collections = {
  collectionName: '',
  collectionsList: [],
};

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setCollectionName: (state, action: { type: string; payload: string }) => {
      state.collectionName = action.payload;
    },
    setCollectionsList: (state, action: { type: string; payload: CollectionInterface[] | [] }) => {
      state.collectionsList = action.payload;
    },
  },
});

export const { setCollectionName, setCollectionsList } = collectionsSlice.actions;

const collectionsReducers = collectionsSlice.reducer;

export default collectionsReducers;
