import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  examPurposes: [],
};

const centralSlice = createSlice({
  name: "central",
  initialState,

  reducers: {
    setExamPurposesWithServices: (state, action) => {
      state.examPurposes = action.payload.examPurposes;
    },
  },
});

export const centralActions = centralSlice.actions;

export default centralSlice;
