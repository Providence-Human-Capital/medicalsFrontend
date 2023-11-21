import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API } from "../../config";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }),
  tagTypes: ["Role", "User", "Company"],
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => "/role",
      
    }),
  }),
});

export const { useGetRolesQuery } = apiSlice;
