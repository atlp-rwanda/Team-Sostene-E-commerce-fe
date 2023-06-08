import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../pages/accounts/login/redux/loginSlice';
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
import signupSlice from './slices/signup';
import usertfaVerifyReducers from '../pages/accounts/tfa/redux/tfaSlice';
import filterCollectionProductsReducer from '../components/seller/components/sellerItems/sellerItemsFilters.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  twoFactor: usertfaVerifyReducers,
  token: tokenReducer,
  signup: signupSlice,
  filterCollectionProducts: filterCollectionProductsReducer,
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
