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

    setLoadingSpinner: (state, action) => {
      state.isLoading = action.payload.isLoading;
    }
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
