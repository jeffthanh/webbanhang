import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productslice from './products/productslice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import userReducer from './user/userslice'; // Sửa tên reducer thành userReducer
import persistedCartReducer from './cart/reducer'
const commonConfig = {
  key: 'shop/user',
  storage
};

const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token','current']
};

export const store = configureStore({
  reducer: {
    app: appSlice,
    products: productslice,
    user: persistReducer(userConfig, userReducer),
    cart: persistedCartReducer,

  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
