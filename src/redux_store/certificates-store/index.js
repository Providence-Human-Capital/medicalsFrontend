import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  certifificateBatch: [],
  medicalDoctor: {},
  batchCompany: {},
  cityOfHarareDnotes: [],
  allDnotes: [],
  simbisaDnotes: [],
  companyDnote: [],
  texasDnotes: [],
};

const certificateSlice = createSlice({
  name: "certificate",
  initialState,

  reducers: {
    setCertificateBatch: (state, action) => ({
      ...state,
      certifificateBatch: action.payload,
    }),

    resetCertificateBatch: (state) => ({
      ...state,
      certifificateBatch: initialState.certifificateBatch,
    }),

    setMedicalDoctor: (state, action) => ({
      ...state,
      medicalDoctor: action.payload,
    }),

    resetMedicalDoctor: (state) => ({
      ...state,
      medicalDoctor: initialState.medicalDoctor,
    }),

    setCompanyBatch: (state, action) => ({
      ...state,
      batchCompany: action.payload,
    }),

    resetCompanyBatch: (state) => ({
      ...state,
      batchCompany: initialState.batchCompany,
    }),

    setCityOfHarareDnotes: (state, action) => ({
      ...state,
      cityOfHarareDnotes: action.payload,
    }),

    setAllDnotes: (state, action) => ({
      ...state,
      allDnotes: action.payload,
    }),

    setSimbisaDnote: (state, action) => ({
      ...state,
      simbisaDnotes: action.payload,
    }),

    setCompanyDnote: (state, action) => ({
      ...state,
      companyDnote: action.payload,
    }),

    setTexasDnotes: (state, action) => ({
      ...state,
      texasDnotes: action.payload,
    }),
  },
});

export const certificateActions = certificateSlice.actions;

export default certificateSlice;
