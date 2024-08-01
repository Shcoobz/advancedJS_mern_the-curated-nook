import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../../../app/api/apiSlice';
import {
  addNewTonieQuery,
  deleteTonieQuery,
  getTonieQuery,
  invalidateToniesTags,
  invalidateTonieTag,
  provideToniesTags,
  transformTonieResponse,
  updateTonieQuery,
  toniesAdapter,
} from './toniesApiSliceUtils';

export const initialState = toniesAdapter.getInitialState();

export const toniesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTonies: builder.query({
      query: getTonieQuery,
      transformResponse: transformTonieResponse,
      providesTags: provideToniesTags,
    }),

    getToniesCount: builder.query({
      query: () => '/tonies/count',
      providesTags: provideToniesTags,
    }),

    addNewTonie: builder.mutation({
      query: addNewTonieQuery,
      invalidatesTags: invalidateToniesTags,
    }),

    updateTonie: builder.mutation({
      query: updateTonieQuery,
      invalidatesTags: invalidateTonieTag,
    }),

    deleteTonie: builder.mutation({
      query: deleteTonieQuery,
      invalidatesTags: invalidateTonieTag,
    }),
  }),
});

export const {
  useGetToniesQuery,
  useGetToniesCountQuery,
  useAddNewTonieMutation,
  useUpdateTonieMutation,
  useDeleteTonieMutation,
} = toniesApiSlice;

export const selectToniesResult = toniesApiSlice.endpoints.getTonies.select();

const selectToniesData = createSelector(
  selectToniesResult,
  (toniesResult) => toniesResult.data
);

export const {
  selectAll: selectAllTonies,
  selectById: selectTonieById,
  selectIds: selectTonieIds,
} = toniesAdapter.getSelectors((state) => selectToniesData(state) ?? initialState);
