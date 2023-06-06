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

    deleteIllness: (state, action) => {
      const index = state.illnesses.findIndex(
        (illness) => illness.id === action.payload.id
      );
      if (index !== -1) {
        state.illnesses.splice(index, 1);
      }
    },
  },
});

export const illnessActions = illnessSlice.actions;

export default illnessSlice;
