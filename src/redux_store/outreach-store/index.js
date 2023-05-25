import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  outreachPatients: [],
  latestOPatients: [],
  isLoading: false,
  error: "",
};

const outReachSlice = createSlice({
  name: "outreach",
  initialState,
  reducers: {
    setOutReachPatients: (state, action) => {
      state.outreachPatients = action.payload.outreachPatients;
      state.isLoading = false;
      state.error = "";
    },

    setLatestPatients: (state, action) => {
      state.latestOPatients = action.payload.latestOPatients;
      state.isLoading = false;
      state.error = "";
    },
  },
});

export const outReachActions = outReachSlice.actions;

export default outReachSlice;
