import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const userAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const initialState = userAdapter.getInitialState();

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user", // Check if "/user" is the correct API endpoint
      providesTags: (result, error, arg) => {
        // Ensure that result.data is an array and has the expected
        console.log("result", result);
        const userTags = result.data.map(({ id }) => ({
          type: "User",
          id: id,
        }));
        return ["User", ...userTags];
      },
    }),

    getUserById: builder.query({
      query: (id) => `/user/${id}`,
      invalidatesTags: ["User"],
    }),

    getUserDependants: builder.query({
      query: (id) => `/patient/depandants/${id}`,
      invalidatesTags: ["User"],
    }),

    addNewUser: builder.mutation({
      query: (initialUser) => ({
        url: "/user",
        method: "POST",
        body: initialUser,
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: (initialUser) => ({
        url: `/user/${initialUser.id}`,
        method: "PATCH",
        body: initialUser,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetUserDependantsQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userSlice;
