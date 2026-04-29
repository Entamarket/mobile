import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "Auth-slice",
  initialState: {
    searchQuery: "",
    edit: true,
  },
  reducers: {
    setSearchQuery(state, payload) {
      state.searchQuery = payload.payload;
    },
    setEditable(state, payload) {
      state.edit = payload.payload;
    },
  },
});

export const searchActions = slice.actions;
export const searchReducer = slice.reducer;
