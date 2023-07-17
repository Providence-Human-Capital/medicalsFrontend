import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  isLoading: false,
  error: "",
  companiesWithBatches: [],
  companyCount: 0,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    clearCompaniesOnLogout: () => initialState,
    setCompanies: (state, action) => {
      state.companies = action.payload.companies;
      state.isLoading = false;
      state.error = "";
    },

    deleteCompany: (state, action) => {
      state.companies = state.companies.filter(
        (company) => company.id !== action.payload.id
      );
    },

    setCompaniesWithBatches: (state, action) => ({
      ...state,
      companiesWithBatches: action.payload,
    }),

    resetCompaniesWithBatches: (state) => ({
      ...state,
      companiesWithBatches: initialState.companiesWithBatches,
    }),
  },
});

export const companyActions = companySlice.actions;

export default companySlice;
