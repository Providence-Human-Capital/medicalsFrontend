import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  isLoading: false,
  error: "",
  companyCount: 0,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload.companies;
      state.isLoading = false
      state.error = ""

    },
  },
});

export const companyActions = companySlice.actions;

export default companySlice;
