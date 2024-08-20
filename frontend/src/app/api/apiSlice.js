import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createApi } from '@reduxjs/toolkit/query/react';
import { API, HTTP_STATUS, LINK, TAG_TYPE } from '../../config/common/constants';
import { getToken, prepareRequestHeaders, refreshToken } from './apiSliceUtils';
import { logOut, setCredentials } from '../../features/auth/state/authSlice';
import { toast } from 'react-toastify';

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
    console.log('api slice: Sending refresh token');

    const refreshResult = await refreshToken(api, extraOptions);
    console.log('api slice: refresh Result: ', refreshResult);

    // if (!refreshResult) {
    //   return await baseQuery(args, api, extraOptions);
    // }

    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());

      sessionStorage.setItem(
        'authFailed',
        'Your login has expired. Please log in again!'
      );

      window.location.href = '/';
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
