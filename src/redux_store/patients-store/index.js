import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
  isLoading: false,
  error: "",
  singlePatient: null,
  latestPhysicalExam: null,
  physicalExamAvailable: false
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
      state.latestPhysicalExam = action.payload.latestPhysicalExam
    },

    setPhysicalExamAvailability: (state, action) => {
      state.physicalExamAvailable = action.payload.physicalExamAvailable
    }

  },
});

export const patientActions = patientSlice.actions;

export default patientSlice;
