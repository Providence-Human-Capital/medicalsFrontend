import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patients: [],
  isLoading: false,
  error: "",
  singlePatient: null,
  latestPhysicalExam: null,
  physicalExamAvailable: false,
  pneumoPatients: [],
  industryPatients: [],
  cofPatients: [],
  patientUpdated: false,
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

    setPneumoPatients: (state, action) => {
      state.pneumoPatients = action.payload.pneumoPatients;
      state.isLoading = false;
      state.error = "";
    },

    setIndustryPatients: (state, action) => {
      state.industryPatients = action.payload.industryPatients;
      state.isLoading = false;
      state.error = "";
    },

    updatePatients: (state, action) => {
      state.patientUpdated = !state.patientUpdated;
    },

    setcofPatients: (state, action) => {
      state.cofPatients = action.payload.cofPatients;
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
