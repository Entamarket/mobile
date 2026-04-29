import { createSlice } from "@reduxjs/toolkit";

const pendingOrderSlice = createSlice({
  name: "pending-slice",
  initialState: {
    orderId: "",
  },
  reducers: {
    setOrderId(state, payload) {
      state.orderId = payload.payload;
    },
  },
});

export const pendingOrderActions = pendingOrderSlice.actions;
export const pendingOrderReducers = pendingOrderSlice.reducer;
