import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../../../app/api/apiSlice';
import {
  invalidateLegoTags,
  invalidateLegoTag,
  provideLegoTags,
  legoAdapter,
  transformLegoResponse,
} from './legoApiSliceUtils';

export const initialState = legoAdapter.getInitialState();

export const legoWishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLegoOnWishlist: builder.query({
      query: () => '/lego/wishlist',
      transformResponse: transformLegoResponse,
      providesTags: provideLegoTags,
    }),

    getLegoOnWishlistCount: builder.query({
      query: () => '/lego/count-wishlist',
      providesTags: provideLegoTags,
    }),

    addNewWishlistLego: builder.mutation({
      query: (initialLegoData) => ({
        url: '/lego/wishlist',
        method: 'POST',
        body: initialLegoData,
      }),
      invalidatesTags: invalidateLegoTags,
    }),

    updateWishlistLego: builder.mutation({
      query: (lego) => ({
        url: `/lego/wishlist/${lego.id}`,
        method: 'PATCH',
        body: lego,
      }),
      invalidatesTags: invalidateLegoTag,
    }),

    deleteWishlistLego: builder.mutation({
      query: (id) => ({
        url: `/lego/wishlist/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: invalidateLegoTag,
    }),
  }),
});

export const {
  useGetLegoOnWishlistQuery,
  useGetLegoOnWishlistCountQuery,
  useAddNewWishlistLegoMutation,
  useUpdateWishlistLegoMutation,
  useDeleteWishlistLegoMutation,
} = legoWishlistApiSlice;

export const selectWishlistLegoResult =
  legoWishlistApiSlice.endpoints.getLegoOnWishlist.select();

const selectWishlistLegoData = createSelector(
  selectWishlistLegoResult,
  (legoResult) => legoResult.data
);

export const {
  selectAll: selectAllWishlistLego,
  selectById: selectWishlistLegoById,
  selectIds: selectWishlistLegoIds,
} = legoAdapter.getSelectors((state) => selectWishlistLegoData(state) ?? initialState);
