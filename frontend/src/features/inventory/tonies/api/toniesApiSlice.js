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

    getToniesInCollectionCount: builder.query({
      query: () => '/tonies/count-collection',
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
  useGetToniesInCollectionCountQuery,
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
