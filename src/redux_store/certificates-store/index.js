import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  certifificateBatch: [],
  medicalDoctor: {},
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
  },
});

export const certificateActions = certificateSlice.actions;

export default certificateSlice;
