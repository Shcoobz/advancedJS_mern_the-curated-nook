import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../../../app/api/apiSlice';
import {
  addNewBookQuery,
  booksAdapter,
  deleteBookQuery,
  getBookQuery,
  invalidateBooksTags,
  invalidateBookTag,
  provideBooksTags,
  transformBookResponse,
  updateBookQuery,
} from './booksApiSliceUtils';

export const initialState = booksAdapter.getInitialState();

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: getBookQuery,
      transformResponse: transformBookResponse,
      providesTags: provideBooksTags,
    }),

    getBooksInCollectionCount: builder.query({
      query: () => '/books/count-collection',
      providesTags: provideBooksTags,
    }),

    addNewBook: builder.mutation({
      query: addNewBookQuery,
      invalidatesTags: invalidateBooksTags,
    }),

    updateBook: builder.mutation({
      query: updateBookQuery,
      invalidatesTags: invalidateBookTag,
    }),

    deleteBook: builder.mutation({
      query: deleteBookQuery,
      invalidatesTags: invalidateBookTag,
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBooksInCollectionCountQuery,
  useAddNewBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApiSlice;

export const selectBooksResult = booksApiSlice.endpoints.getBooks.select();

const selectBooksData = createSelector(
  selectBooksResult,
  (booksResult) => booksResult.data
);

export const {
  selectAll: selectAllBooks,
  selectById: selectBookById,
  selectIds: selectBookIds,
} = booksAdapter.getSelectors((state) => selectBooksData(state) ?? initialState);
