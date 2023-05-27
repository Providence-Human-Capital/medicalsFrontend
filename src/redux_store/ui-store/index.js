import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  showAlert: false,
  error: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.showAlert = action.payload.setAlert;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
