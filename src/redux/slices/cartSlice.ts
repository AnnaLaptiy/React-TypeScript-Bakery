import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ItemType } from './piesSlice';

type CartItem = {
  id: number;
  firstImage: string;
  secondImage?: string;
  title: string;
  secondTitle: string;
  description: string;
  size?: string;
  weight?: string;
  compound?: string;
  price: number;
  totalPrice:number,
  count: number;
};

interface CartSliceState{
  totalPrice:number,
  items:CartItem[]
};

const initialState:CartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemType>) => {
      const isAlreadyThere = state.items.find((obj) => obj.id === action.payload.id);
      if (isAlreadyThere) {
        isAlreadyThere.count++;
        isAlreadyThere.totalPrice += action.payload.price;
      } else {
        state.items.push({ ...action.payload, count: 1, totalPrice: action.payload.price });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    deleteOnePie: (state, action: PayloadAction<number>) => {
      const isAlreadyThere = state.items.find((obj) => obj.id === action.payload);
      if (isAlreadyThere&&isAlreadyThere.count > 1) {
        isAlreadyThere.count--;
        isAlreadyThere.totalPrice -= isAlreadyThere.price;
        state.totalPrice = state.totalPrice - isAlreadyThere.price;
      }
    },
    removeAllItems: (state, action) => {
      state.totalPrice = 0;
      state.items = [];
    },
  },
});

export const selectCart = (state:RootState) => state.cart;

export const { addItem, removeItem, removeAllItems, deleteOnePie } = cartSlice.actions;

export default cartSlice.reducer;
