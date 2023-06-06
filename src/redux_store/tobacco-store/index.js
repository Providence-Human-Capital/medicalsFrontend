import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tobaccos: [],
  isLoading: false,
  error: "",
};

const tobaccoSlice = createSlice({
  name: "tobacco",
  initialState,
  reducers: {
    setTobaccos: (state, action) => {
      state.tobaccos = action.payload.tobaccos;
      state.isLoading = false;
      state.error = "";
    },

    deleteTobacco: (state, action) => {
      const index = state.tobaccos.findIndex(
        (tobacco) => tobacco.id === action.payload.id
      );
      if (index !== -1) {
        state.tobaccos.splice(index, 1);
      }
    },
  },
});

export const tobaccoActions = tobaccoSlice.actions;

export default tobaccoSlice;
