import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../types/Item";

export interface cartState {
  products: Item[];
  quantity: number;
  total: number;
}

interface deleteItem {
  id: string;
  total: number;
  index: number;
}

const initialState: cartState = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Item>) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    deleteCartAfterPayment: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
    deleteCartItem: (state, action: PayloadAction<deleteItem>) => {
      state.products = state.products.filter(
        (prod, index) => index !== action.payload.index
      );
      state.quantity -= 1;
      state.total -= action.payload.total;
    },
  },
});

export const { addProduct, deleteCartAfterPayment, deleteCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;
