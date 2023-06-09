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
import collectionsReducers from '../pages/dashboard/collections.slice';
import usertfaVerifyReducers from '../pages/accounts/tfa/redux/tfaSlice';
import filterCollectionProductsReducer from '../components/seller/components/sellerItems/sellerItemsFilters.slice';
import {
  resetPasswordReducer,
  forgotPasswordReducer,
} from '../pages/accounts/resetPassword/redux/resetPasswordSlice';
import {
  getUserReducer,
  setRoleReducer,
  disableAccountReducer,
} from '../pages/role/redux/assignRolesSlice';
import addToCartReducer from '../components/cart/redux/addToCartSlice';
import cartDataReducer from '../components/cart/redux/cartDataSlice';
import fetchTopProductsReducer from '../components/Product/redux/getTopProductsSlice';
import getCartSlice from '../pages/viewCart/redux/getCartSlice';
import chatsReducers from '../pages/chats/chats.slice';
import productReducer from '../pages/product/redux/productSlice';
import productsAddReducers from '../pages/dashboard/addProductToCollection/addProduct.slice';
import searchReducer from '../pages/search/redux/searchSlice';
import productSlice from './slices/productSlice';
// import tfaReducer from '../pages/accounts/tfa/redux/tfaSlice';
import orderStatus from '../pages/orders/redux/trackOrderSlice';
import { checkoutReducer } from '../pages/checkout/redux/checkoutSlice';
import profileReducer from '../pages/editProfiles/redux/userProfile';
import markOneAsReadReducer from '../components/notification/redux/markOneAsReadSlice';
import markAllAsReadReducer from '../components/notification/redux/markAllAsReadSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  twoFactor: usertfaVerifyReducers,
  token: tokenReducer,
  signup: signupSlice,
  filterCollectionProducts: filterCollectionProductsReducer,
  resetPassword: resetPasswordReducer,
  forgotPassword: forgotPasswordReducer,
  getUsers: getUserReducer,
  collectionsReducers,
  setRole: setRoleReducer,
  addToCart: addToCartReducer,
  cartData: cartDataReducer,
  productsAddReducers,
  topProducts: fetchTopProductsReducer,
  getCart: getCartSlice,
  product: productReducer,
  chatsReducers,
  disableAccount: disableAccountReducer,
  search: searchReducer,
  products: productSlice,
  getOrderStatus: orderStatus,
  checkout: checkoutReducer,
  profile: profileReducer,
  // add your new reducer created
  markOneNotification: markOneAsReadReducer,
  markAllNotificationsAsRead: markAllAsReadReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
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
