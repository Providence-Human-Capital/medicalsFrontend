import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  illnesses: [],
  isLoading: false,
  error: "",
};

const illnessSlice = createSlice({
  name: "illness",
  initialState,
  reducers: {
    setIllnesses: (state, action) => {
      state.illnesses = action.payload.illnesses;
      state.isLoading = false;
      state.error = "";
    },
  },
});

export const illnessActions = illnessSlice.actions;

export default illnessSlice;
