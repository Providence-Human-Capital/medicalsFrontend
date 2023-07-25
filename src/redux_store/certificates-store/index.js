import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  certifificateBatch: [],
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
  },
});

export const certificateActions = certificateSlice.actions;

export default certificateSlice;
