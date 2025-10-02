import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; // <--- type-only import
import type { orderBasketItem, orderBasket } from "../types/orderBasket";

interface BasketState {
  basket: orderBasket | null;
  loading: boolean;
}

const initialState: BasketState = {
  basket: { id: 0, userId: 0, items: [] }, // veya boş userId
  loading: false,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action: PayloadAction<orderBasket | null>) => {
      state.basket = action.payload;
    },
    clearBasket: (state) => {
      state.basket = null;
    },
    addItem: (state, action: PayloadAction<orderBasketItem>) => {
      if (!state.basket) return;
      const existingItem = state.basket.items.find(
        (i) => i.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.basket.items.push(action.payload);
      }
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      if (!state.basket) return;
      const item = state.basket.items.find(
        (i) => i.productId === action.payload.productId
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      if (!state.basket) return;
      state.basket.items = state.basket.items.filter(
        (i) => i.productId !== action.payload
      );
    },
  },
});

export const {
  setBasket,
  clearBasket,
  addItem,
  updateItemQuantity,
  removeItem,
} = basketSlice.actions;
export default basketSlice.reducer;
