import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  showAlert: false,
  error: "",
  showDeleteConfirmation: false,
  itemToDelete: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    resetOnLogOut: () => initialState,
    setAlert: (state, action) => {
      state.showAlert = action.payload.setAlert;
    },

    setLoadingSpinner: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },

    deleteItem: (state, action) => {
      const itemId = action.payload;
      state.showDeleteConfirmation = false;
      state.itemToDelete = null;
    },

    showDeleteConfirmation: (state, action) => {
      const itemId = action.payload;
      state.showDeleteConfirmation = true;
    },

    hideDeleteConfirmation: (state) => {
      state.showDeleteConfirmation = false;
      state.itemToDelete = null;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
