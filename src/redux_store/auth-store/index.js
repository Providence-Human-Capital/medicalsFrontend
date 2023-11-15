import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  isAuth: false,
  userId: null,
  isLoading: false,
  token: null,
  role: null,
  type: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = action.payload.isAuth;
      state.role = action.payload.user.role;
      state.userId = action.payload.user.id;
      state.type = action.payload.user.type;
    },

    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      state.isLoading = false;
      state.role = null;
      state.type = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
