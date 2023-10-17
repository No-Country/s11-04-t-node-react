"use client";
import { createSlice } from "@reduxjs/toolkit";

const sessionUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  value: {
    isAuth: sessionUser ? true : false,
    fullName: sessionUser ? sessionUser.fullName : "",
    token: sessionUser ? sessionUser.token : "",
    role: sessionUser ? sessionUser.role : "",
  },
};

export const user = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    logout: () => {
      localStorage.clear();
      return initialState;
    },
    login: (state, action) => {
      const { fullName, role, token } = action.payload;
      const newStateValue = {
        ...state.value,
        isAuth: true,
        fullName: fullName,
        token: token,
        role,
      };
      localStorage.setItem("user", JSON.stringify({ fullName, role, token }));
      state.value = newStateValue;
    },
  },
});

export const { login, logout } = user.actions;

export default user.reducer;
