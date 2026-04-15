import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import cartReducer from './cartSlice'
import wishlistReducer from "./wishlistSlice"

const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: string) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});
const storage =
  typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const cartPersistConfig = {
  key: "cart",
  storage: storage
}

const wishlistPersistConfig = {
  key: "wishlist",
  storage: storage
}

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
  wishlist: persistReducer(wishlistPersistConfig, wishlistReducer)
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type IRootState = ReturnType<typeof store.getState>
export type IAppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<IAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

export default store