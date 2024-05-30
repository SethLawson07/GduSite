import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cart/cartSlice";
import cartserviceReducer from "./cart/cartserviceSlice";
import wishListSlice from "./wishlist/wishListSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedCartServiceReducer = persistReducer(persistConfig, cartserviceReducer);
const persistedWhiteListReducer = persistReducer(persistConfig, wishListSlice);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    service: persistedCartServiceReducer,
    wishList: persistedWhiteListReducer,
  },
});

export const persistor = persistStore(store);
