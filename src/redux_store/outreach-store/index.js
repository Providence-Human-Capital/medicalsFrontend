import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  outreachPatients: [],
  latestOPatients: [],
  isLoading: false,
  error: "",
  newEntry: false
};

const outReachSlice = createSlice({
  name: "outreach",
  initialState,
  reducers: {

    clearOutReachOnLogout: () => initialState,
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

    setNewEntry: (state, action) => {
      state.newEntry = action.payload.newEntry;
    }
  },
});

export const outReachActions = outReachSlice.actions;

export default outReachSlice;
