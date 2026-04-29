import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart-slice",
  initialState: {
    cartError: "",
    isCartError: false,
  },
  reducers: {
    setCartError(state, payload) {
      state.cartError = payload.payload;
    },
    setIsCartError(state, payload) {
      state.isCartError = payload.payload;
    },
  },
});

export const cartSliceActions = cartSlice.actions;
export const cartSliceReducers = cartSlice.reducer;
