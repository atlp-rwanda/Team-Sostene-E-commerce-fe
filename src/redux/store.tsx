import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import tokenReducer from './slices/tokenSlice';
import tfaReducer from '../pages/accounts/tfa/redux/tfaSlice';
import signupSlice from './slices/signup';

const rootReducer = combineReducers({
  count: counterReducer,
  twoFactor: tfaReducer,
  token: tokenReducer,
  // add your new reducer created
  signup: signupSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'], // Add the state key you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
