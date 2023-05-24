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
  },
});

export const tobaccoActions = tobaccoSlice.actions;

export default tobaccoSlice;
