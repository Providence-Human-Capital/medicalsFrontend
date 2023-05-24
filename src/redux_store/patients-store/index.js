import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
  isLoading: false,
  error: "",
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatients: (state, action) => {
      state.patients = action.payload.patients;
      state.isLoading = false;
      state.error = "";
    },
  },
});

export const patientActions = patientSlice.actions;

export default patientSlice;
