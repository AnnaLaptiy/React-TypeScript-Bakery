import { configureStore } from '@reduxjs/toolkit';
import filterReduser from './slices/filterSlice';
import cartReduser from './slices/cartSlice';
import pieReduser from './slices/piesSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { filter: filterReduser, cart: cartReduser, pie: pieReduser },
});

export type RootState= ReturnType<typeof store.getState>;

export type AppDispatch=typeof store.dispatch
export const useAppDispatch=()=>useDispatch<AppDispatch>()