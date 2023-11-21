import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const companyAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const initialState = companyAdapter.getInitialState();

export const companySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: () => "/company",
      providesTags: (result, error, arg) => [
        "Company",
        ...result.data.map(({ id }) => ({ type: "Company", id: id })),
      ],
    }),
  }),
});

export const { useGetCompaniesQuery } = companySlice;
