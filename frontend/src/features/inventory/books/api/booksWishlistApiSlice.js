import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../../../app/api/apiSlice';
import {
  invalidateBooksTags,
  invalidateBookTag,
  provideBooksTags,
  booksAdapter,
  transformBookResponse,
} from './booksApiSliceUtils';

export const initialState = booksAdapter.getInitialState();

export const booksWishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooksOnWishlist: builder.query({
      query: () => '/books/wishlist',
      transformResponse: transformBookResponse,
      providesTags: provideBooksTags,
    }),

    getBooksOnWishlistCount: builder.query({
      query: () => '/books/count-wishlist',
      providesTags: provideBooksTags,
    }),

    addNewWishlistBook: builder.mutation({
      query: (initialBookData) => ({
        url: '/books/wishlist',
        method: 'POST',
        body: initialBookData,
      }),
      invalidatesTags: invalidateBooksTags,
    }),

    updateWishlistBook: builder.mutation({
      query: (book) => ({
        url: `/books/wishlist/${book.id}`,
        method: 'PATCH',
        body: book,
      }),
      invalidatesTags: invalidateBookTag,
    }),

    deleteWishlistBook: builder.mutation({
      query: (id) => ({
        url: `/books/wishlist/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: invalidateBookTag,
    }),
  }),
});

export const {
  useGetBooksOnWishlistQuery,
  useGetBooksOnWishlistCountQuery,
  useAddNewWishlistBookMutation,
  useUpdateWishlistBookMutation,
  useDeleteWishlistBookMutation,
} = booksWishlistApiSlice;

export const selectWishlistBooksResult =
  booksWishlistApiSlice.endpoints.getBooksOnWishlist.select();

const selectWishlistBooksData = createSelector(
  selectWishlistBooksResult,
  (booksResult) => booksResult.data
);

export const {
  selectAll: selectAllWishlistBooks,
  selectById: selectWishlistBookById,
  selectIds: selectWishlistBookIds,
} = booksAdapter.getSelectors((state) => selectWishlistBooksData(state) ?? initialState);
