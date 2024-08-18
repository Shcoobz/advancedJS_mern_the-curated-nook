import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../../../app/api/apiSlice';
import {
  invalidateToniesTags,
  invalidateTonieTag,
  provideToniesTags,
  toniesAdapter,
  transformTonieResponse,
} from './toniesApiSliceUtils';

export const initialState = toniesAdapter.getInitialState();

export const toniesWishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getToniesOnWishlist: builder.query({
      query: () => '/tonies/wishlist',
      transformResponse: transformTonieResponse,
      providesTags: provideToniesTags,
    }),

    getToniesOnWishlistCount: builder.query({
      query: () => '/tonies/count-wishlist',
      providesTags: provideToniesTags,
    }),

    addNewWishlistTonie: builder.mutation({
      query: (initialTonieData) => ({
        url: '/tonies/wishlist',
        method: 'POST',
        body: initialTonieData,
      }),
      invalidatesTags: invalidateToniesTags,
    }),

    updateWishlistTonie: builder.mutation({
      query: (tonie) => ({
        url: `/tonies/wishlist/${tonie.id}`,
        method: 'PATCH',
        body: tonie,
      }),
      invalidatesTags: invalidateTonieTag,
    }),

    deleteWishlistTonie: builder.mutation({
      query: (id) => ({
        url: `/tonies/wishlist/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: invalidateTonieTag,
    }),
  }),
});

export const {
  useGetToniesOnWishlistQuery,
  useGetToniesOnWishlistCountQuery,
  useAddNewWishlistTonieMutation,
  useUpdateWishlistTonieMutation,
  useDeleteWishlistTonieMutation,
} = toniesWishlistApiSlice;

export const selectWishlistToniesResult =
  toniesWishlistApiSlice.endpoints.getToniesOnWishlist.select();

const selectWishlistToniesData = createSelector(
  selectWishlistToniesResult,
  (toniesResult) => toniesResult.data
);

export const {
  selectAll: selectAllWishlistTonies,
  selectById: selectWishlistTonieById,
  selectIds: selectWishlistTonieIds,
} = toniesAdapter.getSelectors(
  (state) => selectWishlistToniesData(state) ?? initialState
);
