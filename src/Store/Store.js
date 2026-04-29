import { configureStore } from "@reduxjs/toolkit";
import { SliceReducer } from "../Slice/Auth-Slice";
import { cartSliceReducers } from "../Slice/Cart-Slice";
import { searchReducer } from "../Slice/Search-Slice";
import { pendingOrderReducers } from "../Slice/PendingOrder-Slice";

const store = configureStore({
  reducer: {
    isLoggedIn: SliceReducer,
    cartSlice: cartSliceReducers,
    searchSlice: searchReducer,
    pending: pendingOrderReducers,
  },
});

export default store;
