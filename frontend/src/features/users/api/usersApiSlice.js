import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../../app/api/apiSlice';
import {
  addNewUserQuery,
  deleteUserQuery,
  getUserQuery,
  invalidateUsersTags,
  invalidateUserTag,
  provideUsersTags,
  transformUserResponse,
  updateUserQuery,
  usersAdapter,
} from './usersApiSliceUtils';

export const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: getUserQuery,
      transformResponse: transformUserResponse,
      providesTags: provideUsersTags,
    }),

    addNewUser: builder.mutation({
      query: addNewUserQuery,
      invalidatesTags: invalidateUsersTags,
    }),

    updateUser: builder.mutation({
      query: updateUserQuery,
      invalidatesTags: invalidateUserTag,
    }),

    deleteUser: builder.mutation({
      query: deleteUserQuery,
      invalidatesTags: invalidateUserTag,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
