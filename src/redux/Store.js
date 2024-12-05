import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./features/api/baseApi";
import purchaseLogReducer from "../redux/features/purchase/purchaseSlice";
import sellLogReducer from "../redux/features/sellApi/SellSlice";

const persistConfig = {
  key: "auth",
  storage,
};

const purchaseLogPersistConfig = {
  key: "purchaseLog",
  storage,
};
const sellLogPersistConfig = {
  key: "sellLog",
  storage,
};

const persistedOrderLogReducer = persistReducer(
  purchaseLogPersistConfig,
  purchaseLogReducer
);
const persistedSellLogReducer = persistReducer(
  sellLogPersistConfig,
  sellLogReducer
);

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    purchaseLog: persistedOrderLogReducer,
    sellLog: persistedSellLogReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
