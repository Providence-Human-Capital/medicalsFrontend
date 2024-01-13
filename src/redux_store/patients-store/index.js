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

  patientStatistics: [],
  patientsPerIllness: [],
  patientsPerAuscultate: [],
  patientsPerTobacco: [],
  patientsPerDisease: [],

  searchResults: [],

  reportsFilteredResults: [],

  activityByDay: [],
  reportByDay: [],
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    clearPatientsOnLogout: () => initialState,
    setPatients: (state, action) => {
      state.patients = action.payload.patients;
      state.isLoading = false;
      state.error = "";
    },

    isLoadingStart: (state, action) => {
      state.isLoading = true;
    },

    isError: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },

    setSearchResult: (state, action) => {
      state.searchResults = action.payload.searchResults;
    },

    setReportsFilteredResults: (state, action) => {
      state.reportsFilteredResults = action.payload.reportsFilteredResults;
    },

    resetSearchResult: (state, action) => {
      state.searchResults = [];
    },

    setPneumoPatients: (state, action) => {
      state.pneumoPatients = action.payload.pneumoPatients;
      state.isLoading = false;
      state.error = "";
    },

    setActivityByDay: (state, action) => {
      state.activityByDay = action.payload.activityByDay;
      state.isLoading = false;
      state.error = "";
    },

    setReportByDay: (state, action) => {
      state.reportByDay = action.payload.reportByDay;
      state.isLoading = false;
      state.error = "";
    },

    setStatistics: (state, action) => {
      state.patientStatistics = action.payload.patientStatistics;
      state.isLoading = false;
      state.error = "";
    },

    setIllnessStatistics: (state, action) => {
      state.patientsPerIllness = action.payload.patientsPerIllness;
      state.isLoading = false;
      state.error = "";
    },

    setTobaccouseStatistics: (state, action) => {
      state.patientsPerTobacco = action.payload.patientsPerTobacco;
      state.isLoading = false;
      state.error = "";
    },
    setAuscultateStatistics: (state, action) => {
      state.patientsPerAuscultate = action.payload.patientsPerAuscultate;
      state.isLoading = false;
      state.error = "";
    },
    setDiseasesStatistics: (state, action) => {
      state.patientsPerDisease = action.payload.patientsPerDisease;
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
