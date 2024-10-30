import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTF: [],
  beneficiaryPrint: {},
};

const printSlice = createSlice({
  name: "print",
  initialState,

  reducers: {
    clearOnLoad: (state) => {
      state.currentTF = [];
      state.beneficiaryPrint = {};
    },
    setCurrentPrintBookingForms: (state, actions) => {
      state.currentTF = actions.payload.currentTF;
    },
  },
});

export const printActions = printSlice.actions;

export default printSlice;
