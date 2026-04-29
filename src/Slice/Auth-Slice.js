import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "Auth-slice",
  initialState: {
    loggedIn: false,
    isUser: false,
    userType: "",
    isType: false,
    render: false,
    userData: "",
  },
  reducers: {
    loginAuth(state, payload) {
      state.loggedIn = payload.payload;
    },
    isUserAuth(state, payload) {
      state.isUser = payload.payload;
    },
    userTypeHandler(state, payload) {
      state.userType = payload.payload;
    },
    setIsType(state, payload) {
      state.isType = payload.payload;
    },
    setRender(state, payload) {
      state.render = payload.payload;
    },
    setUserData(state, payload) {
      state.userData = payload.payload;
    },
  },
});

export const SliceActions = slice.actions;
export const SliceReducer = slice.reducer;
