import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/query';
import { API, HTTP_STATUS, LINK, TAG_TYPE } from '../../config/common/constants';
import { getToken, prepareRequestHeaders, refreshToken } from './apiSliceUtils';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: API.credentials,
  prepareHeaders: (headers, { getState }) => {
    const token = getToken(getState());

    return prepareRequestHeaders(headers, token);
  },
});

async function baseQueryWithReauth(args, api, extraOptions) {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === HTTP_STATUS.ERROR.forbidden) {
    const refreshResult = await refreshToken(api, extraOptions);

    if (!refreshResult) {
      return await baseQuery(args, api, extraOptions);
    }

    return refreshResult;
  }

  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: TAG_TYPE.types,

  endpoints: (builder) => ({
    placeholder: builder.query({
      query: () => LINK.placeholder,
    }),
  }),
});
