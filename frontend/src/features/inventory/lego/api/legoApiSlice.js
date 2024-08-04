import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../../../app/api/apiSlice';
import {
  addNewLegoQuery,
  deleteLegoQuery,
  getLegoQuery,
  invalidateLegoTag,
  invalidateLegoTags,
  legoAdapter,
  provideLegoTags,
  transformLegoResponse,
  updateLegoQuery,
} from './legoApiSliceUtils';

export const initialState = legoAdapter.getInitialState();

export const legoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLego: builder.query({
      query: getLegoQuery,
      transformResponse: transformLegoResponse,
      providesTags: provideLegoTags,
    }),

    getLegoInCollectionCount: builder.query({
      query: () => '/lego/count-collection',
      providesTags: provideLegoTags,
    }),

    getLegoOnWishlistCount: builder.query({
      query: () => '/lego/count-wishlist',
      providesTags: provideLegoTags,
    }),

    addNewLego: builder.mutation({
      query: addNewLegoQuery,
      invalidatesTags: invalidateLegoTags,
    }),

    updateLego: builder.mutation({
      query: updateLegoQuery,
      invalidatesTags: invalidateLegoTag,
    }),

    deleteLego: builder.mutation({
      query: deleteLegoQuery,
      invalidatesTags: invalidateLegoTag,
    }),
  }),
});

export const {
  useGetLegoQuery,
  useGetLegoInCollectionCountQuery,
  useGetLegoOnWishlistCountQuery,
  useAddNewLegoMutation,
  useUpdateLegoMutation,
  useDeleteLegoMutation,
} = legoApiSlice;

export const selectLegoResult = legoApiSlice.endpoints.getLego.select();

const selectLegoData = createSelector(selectLegoResult, (legoResult) => legoResult.data);

export const {
  selectAll: selectAllLego,
  selectById: selectLegoById,
  selectIds: selectLegoIds,
} = legoAdapter.getSelectors((state) => selectLegoData(state) ?? initialState);
