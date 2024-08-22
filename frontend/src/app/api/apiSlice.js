import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';
import { API, HTTP_STATUS, LINK, TAG_TYPE } from '../../config/common/constants';
import { prepareHeadersWithToken } from './apiSliceUtils';
import { setCredentials } from '../../features/auth/state/authSlice';

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: API.credentials,
  prepareHeaders: prepareHeadersWithToken,
});

async function baseQueryWithReauth(args, api, extraOptions) {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === HTTP_STATUS.ERROR.forbidden) {
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === HTTP_STATUS.ERROR.forbidden) {
        sessionStorage.setItem(
          'authFailed',
          'Your login has expired. Please log in again.'
        );
      }

      return refreshResult;
    }
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
