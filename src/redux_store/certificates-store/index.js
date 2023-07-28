import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  certifificateBatch: [],
  medicalDoctor: {},
  batchCompany: {},
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
  },
});

export const certificateActions = certificateSlice.actions;

export default certificateSlice;
