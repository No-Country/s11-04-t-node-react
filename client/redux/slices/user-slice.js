import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isAuth: sessionStorage.getItem("token") ? true : false,
    fullName: sessionStorage.getItem("userName") || "",
    userId: sessionStorage.getItem("userId") || "",
    token: sessionStorage.getItem("token") || "",
  },
};

export const user = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    logout: () => {
      sessionStorage.clear();
      return initialState;
    },
    login: (state, action) => {
        console.log(action.payload)
      const { fullName, id, token } = action.payload;
      const newStateValue = {
        ...state.value,
        isAuth: true,
        fullName: fullName,
        userId: id,
        token: token,
      };
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userId", id);
      sessionStorage.setItem("userName", fullName);
      state.value = newStateValue;
    },
  },
});

export const { login, logout } = user.actions;

export default user.reducer;
