import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
  isLoading: false,
  error: "",
  singlePatient: null,
  latestPhysicalExam: null,
  physicalExamAvailable: false,
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

    setSinglePatient: (state, action) => {
      state.singlePatient = action.payload.singlePatient;
    },

    setLatestPhysicalExam: (state, action) => {
      state.latestPhysicalExam = action.payload.latestPhysicalExam;
    },

    setPhysicalExamAvailability: (state, action) => {
      state.physicalExamAvailable = action.payload.physicalExamAvailable;
    },

    deletePatient: (state, action) => {
      const index = state.patients.findIndex(
        (patients) => patients.id === action.payload.id
      );
      if (index !== -1) {
        state.patients.splice(index, 1);
      }
    },
  },
});

export const patientActions = patientSlice.actions;

export default patientSlice;
